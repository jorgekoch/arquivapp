import { z } from "zod";

export const createWaitlistLeadSchema = z.object({
  name: z.string().max(100, "Nome muito longo").optional().or(z.literal("")),
  email: z.string().email("E-mail inválido"),
  interest: z.string().max(50).optional(),
});