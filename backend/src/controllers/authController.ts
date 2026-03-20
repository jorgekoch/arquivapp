import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/authService";
import {
  forgotPasswordService,
  resetPasswordService,
} from "../services/passwordResetService";
import { verifyEmailToken } from "../services/emailVerificationService";
import { AppError } from "../errors/AppError";



export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    await forgotPasswordService(email);

    res.send({
      message:
        "Se existir uma conta com esse e-mail, enviaremos um link de recuperação.",
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token, password } = req.body;

    await resetPasswordService(token, password);

    res.send({
      message: "Senha redefinida com sucesso.",
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyEmailController(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.params.token;

    if (!token || Array.isArray(token)) {
      throw new AppError("Token inválido", 400);
    }

    await verifyEmailToken(token);

    // Redireciona pro frontend (melhor UX)
    res.redirect(`${process.env.FRONTEND_URL}/email-confirmed`);
  } catch (error) {
    next(error);
  }
}