import React from 'react';
import { AuthProvider } from '../components/AuthContext';
import ChatbotWidget from '../components/ChatbotWidget';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ChatbotWidget />
    </AuthProvider>
  );
}
