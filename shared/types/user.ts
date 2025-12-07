export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface HardwareSpecs {
  gpu?: string;
  ram?: string;
  cpu?: string;
  os?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  programmingLanguages: string[];
  rosFamiliarity: ProficiencyLevel;
  roboticsKnowledge: ProficiencyLevel;
  hardwareSpecs: HardwareSpecs | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface OnboardingRequest {
  programmingLanguages: string[];
  rosFamiliarity: ProficiencyLevel;
  roboticsKnowledge: ProficiencyLevel;
  hardwareSpecs?: HardwareSpecs;
}

export interface UserWithProfile {
  user: User;
  profile: UserProfile | null;
}
