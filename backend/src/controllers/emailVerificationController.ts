import { Request, Response, NextFunction } from "express";
import { verifyEmailToken } from "../services/emailVerificationService";
import { AppError } from "../errors/AppError";

export async function confirmEmailController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.params.token;

    if (!token || Array.isArray(token)) {
      throw new AppError("Token inválido", 400);
    }

    const result = await verifyEmailToken(token);

    res.send(result);
  } catch (error) {
    next(error);
  }
}