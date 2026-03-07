import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  getFolderList,
  getFolders,
  updateFolder,
} from "../controllers/folderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateBody,
  validateParams,
} from "../middlewares/validateSchemaMiddleware";
import { createFolderSchema, updateFolderSchema } from "../schemas/folderSchema";
import { idParamSchema } from "../schemas/paramsSchema";

const router = Router();

router.post("/", authMiddleware, validateBody(createFolderSchema), createFolder);
router.get("/list", authMiddleware, getFolderList);
router.get("/", authMiddleware, getFolders);
router.patch(
  "/:id",
  authMiddleware,
  validateParams(idParamSchema),
  validateBody(updateFolderSchema),
  updateFolder
);
router.delete(
  "/:id",
  authMiddleware,
  validateParams(idParamSchema),
  deleteFolder
);

export default router;