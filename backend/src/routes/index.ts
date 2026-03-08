import { Router } from "express";
import authRoutes from "./authRoutes";
import usersRoutes from "./usersRoutes";
import foldersRoutes from "./foldersRoutes";
import filesRoutes from "./filesRoutes";
import profileRoutes from "./profileRoutes";
import waitlistRoutes from "./waitlistRoutes";

const router = Router();

router.get("/health", (req, res) => {
  res.send("API OK");
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/folders", foldersRoutes);
router.use("/files", filesRoutes);
router.use("/profile", profileRoutes);
router.use("/waitlist", waitlistRoutes);

export default router;