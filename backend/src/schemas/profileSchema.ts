import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password must have at least 6 characters"),
  newPassword: z.string().min(6, "New password must have at least 6 characters"),
});