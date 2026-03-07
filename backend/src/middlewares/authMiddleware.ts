import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token not provided", 401);
    }

    const token = authHeader.replace("Bearer ", "");

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new AppError("JWT_SECRET is not configured", 500);
    }

    const data = jwt.verify(token, jwtSecret) as { userId: number };

    req.userId = data.userId;

    next();
  } catch (error) {
    next(error);
  }
}