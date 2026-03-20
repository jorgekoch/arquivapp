"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
router.get("/init", authMiddleware_1.authMiddleware, dashboardController_1.getDashboardInit);
exports.default = router;
