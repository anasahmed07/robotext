import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface User {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
}

interface UserProfile {
  id: string;
  userId: string;
  programmingLanguages: string[];
  rosFamiliarity: 'Beginner' | 'Intermediate' | 'Advanced';
  roboticsKnowledge: 'Beginner' | 'Intermediate' | 'Advanced';
  hardwareSpecs: {
    gpu?: string;
    ram?: string;
    cpu?: string;
    os?: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => void;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { siteConfig } = useDocusaurusContext();
  const API_URL = (siteConfig.customFields?.API_URL as string) || 'http://localhost:4000';

  const checkSession = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/get-session`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          // Fetch profile if user exists
          const profileResponse = await fetch(`${API_URL}/api/user/me`, {
            credentials: 'include',
          });
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            setProfile(profileData.profile);
          }
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/sign-in/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.error || 'Sign in failed');
    }

    const data = await response.json();
    setUser(data.user);
    await checkSession(); // Refresh session and profile
  };

  const signUp = async (email: string, password: string, name: string) => {
    const response = await fetch(`${API_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.error || 'Sign up failed');
    }

    const data = await response.json();
    setUser(data.user);
  };

  const signOut = async () => {
    await fetch(`${API_URL}/api/auth/sign-out`, {
      method: 'POST',
      credentials: 'include',
    });

    setUser(null);
    setProfile(null);
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...newProfile } as UserProfile);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
