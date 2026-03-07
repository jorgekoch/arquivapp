import { Router } from "express";
import { createUser } from "../controllers/usersController";
import { validateBody } from "../middlewares/validateSchemaMiddleware";
import { createUserSchema } from "../schemas/userSchema";

const router = Router();

router.post("/register", validateBody(createUserSchema), createUser);

export default router;