"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWaitlistLead = createWaitlistLead;
exports.findWaitlistLeadByEmail = findWaitlistLeadByEmail;
const prisma_1 = __importDefault(require("../database/prisma"));
function createWaitlistLead(data) {
    return prisma_1.default.waitlistLead.create({
        data: {
            name: data.name || null,
            email: data.email,
            interest: data.interest || "PRO",
        },
    });
}
function findWaitlistLeadByEmail(email) {
    return prisma_1.default.waitlistLead.findUnique({
        where: { email },
    });
}
