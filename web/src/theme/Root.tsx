import React from 'react';
import { AuthProvider } from '../components/AuthContext';

export default function Root({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
