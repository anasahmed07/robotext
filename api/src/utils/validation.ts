import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email().toLowerCase();

// Password validation (min 8 characters)
export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

// Sign up validation
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
});

// Sign in validation
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// Proficiency level enum
export const proficiencyLevelSchema = z.enum(['Beginner', 'Intermediate', 'Advanced']);

// Hardware specs validation
export const hardwareSpecsSchema = z.object({
  gpu: z.string().optional(),
  ram: z.string().optional(),
  cpu: z.string().optional(),
  os: z.string().optional(),
});

// Onboarding validation
export const onboardingSchema = z.object({
  programmingLanguages: z
    .array(z.string().min(1).max(50))
    .min(0, 'At least one programming language is recommended'),
  rosFamiliarity: proficiencyLevelSchema,
  roboticsKnowledge: proficiencyLevelSchema,
  hardwareSpecs: hardwareSpecsSchema.optional(),
});

// Type exports
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type ProficiencyLevel = z.infer<typeof proficiencyLevelSchema>;
export type HardwareSpecs = z.infer<typeof hardwareSpecsSchema>;
