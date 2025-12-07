import 'dotenv/config';
import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { corsMiddleware } from './middleware/cors.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { auth } from './auth/config.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(corsMiddleware);
app.use(requestLogger);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount better-auth routes (handles all auth endpoints automatically)
// Better Auth provides: /api/auth/sign-up/email, /api/auth/sign-in/email, 
// /api/auth/sign-out, /api/auth/session, etc.
app.all('/api/auth/*', toNodeHandler(auth));

// Error handler (must be last)
app.use(errorHandler);

// For Vercel serverless deployment
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
    console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth/*`);
  });
}
