"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.verifyEmailController = verifyEmailController;
const authService_1 = require("../services/authService");
const passwordResetService_1 = require("../services/passwordResetService");
const emailVerificationService_1 = require("../services/emailVerificationService");
const AppError_1 = require("../errors/AppError");
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await (0, authService_1.loginService)(email, password);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}
async function forgotPassword(req, res, next) {
    try {
        const { email } = req.body;
        await (0, passwordResetService_1.forgotPasswordService)(email);
        res.send({
            message: "Se existir uma conta com esse e-mail, enviaremos um link de recuperação.",
        });
    }
    catch (error) {
        next(error);
    }
}
async function resetPassword(req, res, next) {
    try {
        const { token, password } = req.body;
        await (0, passwordResetService_1.resetPasswordService)(token, password);
        res.send({
            message: "Senha redefinida com sucesso.",
        });
    }
    catch (error) {
        next(error);
    }
}
async function verifyEmailController(req, res, next) {
    try {
        const token = req.params.token;
        if (!token || Array.isArray(token)) {
            throw new AppError_1.AppError("Token inválido", 400);
        }
        await (0, emailVerificationService_1.verifyEmailToken)(token);
        // Redireciona pro frontend (melhor UX)
        res.redirect(`${process.env.FRONTEND_URL}/email-confirmed`);
    }
    catch (error) {
        next(error);
    }
}
