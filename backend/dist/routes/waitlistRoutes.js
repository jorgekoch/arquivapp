"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waitlistController_1 = require("../controllers/waitlistController");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const waitlistSchema_1 = require("../schemas/waitlistSchema");
const router = (0, express_1.Router)();
router.post("/", (0, validateSchemaMiddleware_1.validateBody)(waitlistSchema_1.createWaitlistLeadSchema), waitlistController_1.createWaitlistLeadController);
exports.default = router;
