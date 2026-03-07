import { Router } from "express";
import { createUserController } from "../controllers/usersController";
import { validateBody } from "../middlewares/validateSchemaMiddleware";
import { createUserSchema } from "../schemas/userSchema";

const router = Router();

router.post("/register", validateBody(createUserSchema), createUserController);

export default router;