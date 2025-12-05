import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./auth";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// Better Auth routes
app.all("/api/auth/*", toNodeHandler(auth));

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Auth server is running" });
});

// Protected route example
app.get("/api/user", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({ headers: req.headers });
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  res.json({ user: session.user });
});

app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
