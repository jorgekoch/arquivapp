import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createShareLink,
  openSharedFile,
} from "../controllers/sharedFileController";
import { validateParams } from "../middlewares/validateSchemaMiddleware";
import { idParamSchema } from "../schemas/paramsSchema";

const router = Router();

router.post("/:id/share", authMiddleware, validateParams(idParamSchema), createShareLink);
router.get("/:token", openSharedFile);

export default router;