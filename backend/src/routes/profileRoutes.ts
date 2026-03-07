import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getProfile,
  updateAvatar,
  updatePassword,
  updateProfile,
} from "../controllers/profileController";
import { validateBody } from "../middlewares/validateSchemaMiddleware";
import {
  updatePasswordSchema,
  updateProfileSchema,
} from "../schemas/profileSchema";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/", authMiddleware, getProfile);
router.patch("/", authMiddleware, validateBody(updateProfileSchema), updateProfile);
router.patch(
  "/password",
  authMiddleware,
  validateBody(updatePasswordSchema),
  updatePassword
);
router.patch("/avatar", authMiddleware, upload.single("file"), updateAvatar);

export default router;