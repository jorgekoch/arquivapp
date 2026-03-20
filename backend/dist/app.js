"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://www.arquivapp.com.br",
        "https://arquivapp.com.br",
    ],
    credentials: true,
}));
app.use("/billing/webhook", express_1.default.raw({ type: "application/json" }));
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(errorMiddleware_1.errorMiddleware);
exports.default = app;
