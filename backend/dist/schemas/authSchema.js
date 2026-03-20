"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("E-mail inválido"),
    password: zod_1.z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email("E-mail inválido"),
});
exports.resetPasswordSchema = zod_1.z
    .object({
    token: zod_1.z.string().min(1, "Token é obrigatório"),
    password: zod_1.z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: zod_1.z.string().min(6, "Confirme a senha"),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});
