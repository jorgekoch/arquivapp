import { NextFunction, Request, Response } from "express";
import { sendSupportMessageService } from "../services/supportService";

export async function sendSupportMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId!;
    const { message } = req.body;

    await sendSupportMessageService(userId, message);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}