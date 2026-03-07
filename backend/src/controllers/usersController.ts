import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser } from "../repositories/userRepository";
import { AppError } from "../errors/AppError";

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email, hashedPassword, name);

    res.status(201).send({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return next(new AppError("Email already in use", 409));
    }

    next(error);
  }
}