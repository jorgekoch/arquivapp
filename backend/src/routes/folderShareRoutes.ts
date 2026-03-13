import { Router } from "express";
import {
  createFolderShareController,
  listFolderSharesController,
  listSharedFoldersController,
  removeFolderShareController,
} from "../controllers/folderShareController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createFolderShareController);
router.get("/folder/:folderId", listFolderSharesController);
router.get("/shared-with-me", listSharedFoldersController);
router.delete("/:shareId", removeFolderShareController);

export default router;