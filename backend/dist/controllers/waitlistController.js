"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWaitlistLeadController = createWaitlistLeadController;
const waitlistService_1 = require("../services/waitlistService");
async function createWaitlistLeadController(req, res, next) {
    try {
        const { name, email, interest } = req.body;
        const lead = await (0, waitlistService_1.createWaitlistLeadService)({
            name,
            email,
            interest,
        });
        res.status(201).send({
            id: lead.id,
            email: lead.email,
            message: "Contato salvo com sucesso.",
        });
    }
    catch (error) {
        next(error);
    }
}
