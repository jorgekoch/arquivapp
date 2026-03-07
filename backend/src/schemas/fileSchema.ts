import { z } from "zod";

export const uploadFileBodySchema = z.object({
  folderId: z.coerce.number().int().positive("Invalid folderId"),
});