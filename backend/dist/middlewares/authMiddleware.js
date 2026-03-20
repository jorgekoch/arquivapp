"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../errors/AppError");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new AppError_1.AppError("Token not provided", 401));
    }
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
        return next(new AppError_1.AppError("Invalid token", 401));
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return next(new AppError_1.AppError("JWT_SECRET is not configured", 500));
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!data?.userId) {
            return next(new AppError_1.AppError("Invalid token payload", 401));
        }
        req.userId = data.userId;
        return next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new AppError_1.AppError("Session expired", 401));
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next(new AppError_1.AppError("Invalid token", 401));
        }
        return next(error);
    }
}
