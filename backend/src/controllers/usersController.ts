import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../database/prisma";

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).send({
      id: user.id,
      email: user.email
    });

  } catch (error) {
    res.status(500).send({ error: "Error creating user" });
  }
}