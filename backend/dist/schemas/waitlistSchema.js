"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWaitlistLeadSchema = void 0;
const zod_1 = require("zod");
exports.createWaitlistLeadSchema = zod_1.z.object({
    name: zod_1.z.string().max(100, "Nome muito longo").optional().or(zod_1.z.literal("")),
    email: zod_1.z.string().email("E-mail inválido"),
    interest: zod_1.z.string().max(50).optional(),
});
