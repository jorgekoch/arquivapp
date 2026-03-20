"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const AppError_1 = require("../errors/AppError");
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        const allowedMimeTypes = [
            "application/pdf",
            "audio/mpeg",
            "audio/wav",
            "image/jpeg",
            "image/png",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
            "application/msword" // .doc (antigo)
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new AppError_1.AppError("File type not allowed", 400));
        }
        cb(null, true);
    },
});
