import { NextFunction, Request, Response } from "express";
import { loginService } from "../services/authService";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const token = await loginService(email, password);

    res.send({ token });
  } catch (error) {
    next(error);
  }
}