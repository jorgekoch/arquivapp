"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(100, "Name is too long"),
});
exports.updatePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(6, "Current password must have at least 6 characters"),
    newPassword: zod_1.z.string().min(6, "New password must have at least 6 characters"),
});
