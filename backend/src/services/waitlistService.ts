import { AppError } from "../errors/AppError";
import {
  createWaitlistLead,
  findWaitlistLeadByEmail,
} from "../repositories/waitlistRepository";

type CreateWaitlistLeadInput = {
  name?: string;
  email: string;
  interest?: string;
};

export async function createWaitlistLeadService(
  data: CreateWaitlistLeadInput
) {
  const existingLead = await findWaitlistLeadByEmail(data.email);

  if (existingLead) {
    throw new AppError("Este e-mail já está na lista de interesse.", 409);
  }

  return createWaitlistLead(data);
}