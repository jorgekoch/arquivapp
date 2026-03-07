import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
});