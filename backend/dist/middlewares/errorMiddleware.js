"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const AppError_1 = require("../errors/AppError");
function errorMiddleware(err, req, res, next) {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).send({
            error: err.message,
        });
    }
    console.error(err);
    return res.status(500).send({
        error: "Internal server error",
    });
}
