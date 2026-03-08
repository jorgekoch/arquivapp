import { Router } from "express";
import { createWaitlistLeadController } from "../controllers/waitlistController";
import { validateBody } from "../middlewares/validateSchemaMiddleware";
import { createWaitlistLeadSchema } from "../schemas/waitlistSchema";

const router = Router();

router.post("/", validateBody(createWaitlistLeadSchema), createWaitlistLeadController);

export default router;