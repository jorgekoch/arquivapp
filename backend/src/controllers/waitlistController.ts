import { NextFunction, Request, Response } from "express";
import { createWaitlistLeadService } from "../services/waitlistService";

export async function createWaitlistLeadController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, interest } = req.body;

    const lead = await createWaitlistLeadService({
      name,
      email,
      interest,
    });

    res.status(201).send({
      id: lead.id,
      email: lead.email,
      message: "Contato salvo com sucesso.",
    });
  } catch (error) {
    next(error);
  }
}