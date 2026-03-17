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

type JwtPayload = {
  userId: number;
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Token not provided", 401));
  }

  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return next(new AppError("Invalid token", 401));
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return next(new AppError("JWT_SECRET is not configured", 500));
  }

  try {
    const data = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!data?.userId) {
      return next(new AppError("Invalid token payload", 401));
    }

    req.userId = data.userId;

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError("Session expired", 401));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid token", 401));
    }

    return next(error);
  }
}