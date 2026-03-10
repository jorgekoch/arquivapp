import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getDashboardInit } from "../controllers/dashboardController";

const router = Router();

router.get("/init", authMiddleware, getDashboardInit);

export default router;