import React from 'react';
import { Navigate } from '@docusaurus/router';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireOnboarding = false 
}) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If onboarding is required and user doesn't have a profile, redirect to onboarding
  if (requireOnboarding && !profile) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
