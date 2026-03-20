"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmEmailController = confirmEmailController;
const emailVerificationService_1 = require("../services/emailVerificationService");
const AppError_1 = require("../errors/AppError");
async function confirmEmailController(req, res, next) {
    try {
        const token = req.params.token;
        if (!token || Array.isArray(token)) {
            throw new AppError_1.AppError("Token inválido", 400);
        }
        const result = await (0, emailVerificationService_1.verifyEmailToken)(token);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}
