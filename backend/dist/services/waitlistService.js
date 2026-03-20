"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWaitlistLeadService = createWaitlistLeadService;
const AppError_1 = require("../errors/AppError");
const waitlistRepository_1 = require("../repositories/waitlistRepository");
async function createWaitlistLeadService(data) {
    const existingLead = await (0, waitlistRepository_1.findWaitlistLeadByEmail)(data.email);
    if (existingLead) {
        throw new AppError_1.AppError("Este e-mail já está na lista de interesse.", 409);
    }
    return (0, waitlistRepository_1.createWaitlistLead)(data);
}
