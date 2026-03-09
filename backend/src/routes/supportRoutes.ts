import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { sendSupportMessage } from "../controllers/supportController";

const router = Router();

router.post("/message", authMiddleware, sendSupportMessage);

export default router;