import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid id"),
});

export const folderIdParamSchema = z.object({
  folderId: z.coerce.number().int().positive("Invalid folderId"),
});