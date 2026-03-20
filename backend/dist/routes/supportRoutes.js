"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const supportController_1 = require("../controllers/supportController");
const router = (0, express_1.Router)();
router.post("/message", authMiddleware_1.authMiddleware, supportController_1.sendSupportMessage);
exports.default = router;
