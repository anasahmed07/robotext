import { Router, Request, Response, NextFunction } from 'express';
import { auth } from '../auth/config.js';
import { signUpSchema, signInSchema } from '../utils/validation.js';
import { ZodError } from 'zod';

const router = Router();

/**
 * POST /api/auth/sign-up
 * Create new user account with email and password
 */
router.post('/sign-up', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const validatedData = signUpSchema.parse(req.body);
    
    // better-auth handles user creation, password hashing, and session creation
    const response = await auth.api.signUpEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
      },
    });

    res.status(201).json(response);
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
 * POST /api/auth/sign-in
 * Authenticate user with email and password
 */
router.post('/sign-in', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    const validatedData = signInSchema.parse(req.body);
    
    const response = await auth.api.signInEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
      },
    });

    res.status(200).json(response);
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
 * POST /api/auth/sign-out
 * Terminate current user session
 */
router.post('/sign-out', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await auth.api.signOut({
      headers: new Headers(req.headers as any),
    });

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/auth/get-session
 * Check current authentication status and get session data
 */
router.get('/get-session', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await auth.api.getSession({
      headers: new Headers(req.headers as any),
    });

    if (!response) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
