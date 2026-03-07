import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  getFolders,
} from "../controllers/folderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateBody,
  validateParams,
} from "../middlewares/validateSchemaMiddleware";
import { createFolderSchema } from "../schemas/folderSchema";
import { idParamSchema } from "../schemas/paramsSchema";

const router = Router();

router.post("/", authMiddleware, validateBody(createFolderSchema), createFolder);
router.get("/", authMiddleware, getFolders);
router.delete("/:id", authMiddleware, validateParams(idParamSchema), deleteFolder);

export default router;