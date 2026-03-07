import { Router } from "express";
import authRoutes from "./authRoutes";
import foldersRoutes from "./foldersRoutes";
import filesRoutes from "./filesRoutes";
import usersRoutes from "./usersRoutes";

const router = Router();

router.get("/health", (req, res) => {
  res.send("API OK");
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/folders", foldersRoutes);
router.use("/files", filesRoutes);

export default router;