import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getStorageInfo } from "../controllers/storageController";

const router = Router();

router.get("/", authMiddleware, getStorageInfo);

export default router;