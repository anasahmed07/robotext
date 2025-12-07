import { Router, Request, Response, NextFunction } from 'express';
import { auth } from '../auth/config.js';
import { db } from '../db/client.js';
import { userProfile } from '../db/schema.js';
import { onboardingSchema } from '../utils/validation.js';
import { ZodError } from 'zod';
import { eq } from 'drizzle-orm';

const router = Router();

/**
 * Authentication middleware
 * Verifies user session and attaches user data to request
 */
async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(req.headers as any),
    });

    if (!session || !session.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // Attach user to request object
    (req as any).user = session.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid session' });
  }
}

/**
 * POST /api/user/onboarding
 * Save user profile data (programming languages, ROS familiarity, robotics knowledge, hardware specs)
 */
router.post('/onboarding', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    
    // Validate onboarding data
    const validatedData = onboardingSchema.parse(req.body);
    
    // Check if profile already exists
    const existingProfile = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.userId, user.id))
      .limit(1);

    if (existingProfile.length > 0) {
      // Update existing profile
      const updated = await db
        .update(userProfile)
        .set({
          programmingLanguages: validatedData.programmingLanguages,
          rosFamiliarity: validatedData.rosFamiliarity,
          roboticsKnowledge: validatedData.roboticsKnowledge,
          hardwareSpecs: validatedData.hardwareSpecs,
          updatedAt: new Date(),
        })
        .where(eq(userProfile.userId, user.id))
        .returning();

      res.status(200).json({
        message: 'Profile updated successfully',
        profile: updated[0],
      });
    } else {
      // Create new profile
      const created = await db
        .insert(userProfile)
        .values({
          userId: user.id,
          programmingLanguages: validatedData.programmingLanguages,
          rosFamiliarity: validatedData.rosFamiliarity,
          roboticsKnowledge: validatedData.roboticsKnowledge,
          hardwareSpecs: validatedData.hardwareSpecs,
        })
        .returning();

      res.status(201).json({
        message: 'Profile created successfully',
        profile: created[0],
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      });
      return;
    }
    next(error);
  }
});

/**
 * GET /api/user/me
 * Get current user data with profile
 */
router.get('/me', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    
    // Fetch user profile
    const profile = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.userId, user.id))
      .limit(1);

    res.status(200).json({
      user,
      profile: profile.length > 0 ? profile[0] : null,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
