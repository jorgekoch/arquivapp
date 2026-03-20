"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const userSchema_1 = require("../schemas/userSchema");
const router = (0, express_1.Router)();
router.post("/register", (0, validateSchemaMiddleware_1.validateBody)(userSchema_1.createUserSchema), usersController_1.createUserController);
exports.default = router;
