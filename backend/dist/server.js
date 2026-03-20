"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4000;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (!process.env.RESEND_API_KEY) {
        console.warn("⚠️  RESEND_API_KEY não está configurada.");
    }
    if (!process.env.EMAIL_FROM) {
        console.warn("⚠️  EMAIL_FROM não está configurado.");
    }
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn("⚠️  STRIPE_SECRET_KEY não está configurada.");
    }
});
