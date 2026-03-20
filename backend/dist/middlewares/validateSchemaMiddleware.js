"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
exports.validateParams = validateParams;
const AppError_1 = require("../errors/AppError");
function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((issue) => issue.message);
            return next(new AppError_1.AppError(errors.join(", "), 400));
        }
        req.body = result.data;
        next();
    };
}
function validateParams(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            const errors = result.error.issues.map((issue) => issue.message);
            return next(new AppError_1.AppError(errors.join(", "), 400));
        }
        req.params = result.data;
        next();
    };
}
