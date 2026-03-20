"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const storageController_1 = require("../controllers/storageController");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.authMiddleware, storageController_1.getStorageInfo);
exports.default = router;
