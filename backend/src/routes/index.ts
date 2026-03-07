import { Router } from "express";
import authRoutes from "./authRoutes";
import foldersRoutes from "./foldersRoutes";
import usersRoutes from "./usersRoutes";
import filesRoutes from "./filesRoutes";


const router = Router();

router.get("/health", (req, res) => {
  res.send("API OK");
});

router.use("/auth", authRoutes);
router.use("/folders", foldersRoutes);
router.use("/users", usersRoutes);
router.use("/files", filesRoutes);

export default router;