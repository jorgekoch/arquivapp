import { Request, Response } from "express";
import { getUserStorageUsage, getStorageLimit } from "../services/storageService";
import { findUserById } from "../repositories/userRepository";

export async function getStorageInfo(req: Request, res: Response) {
  const userId = req.userId!;

  const user = await findUserById(userId);

  if (!user) {
    return res.status(404).send({ error: "Usuário não encontrado" });
  }

  const used = await getUserStorageUsage(userId);
  const limit = getStorageLimit(user.plan);

  res.send({
    used,
    limit,
    plan: user.plan,
  });
}