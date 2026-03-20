"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSessionController = createCheckoutSessionController;
exports.createCustomerPortalSessionController = createCustomerPortalSessionController;
exports.stripeWebhookController = stripeWebhookController;
exports.getCheckoutSessionStatusController = getCheckoutSessionStatusController;
const AppError_1 = require("../errors/AppError");
const billingService_1 = require("../services/billingService");
async function createCheckoutSessionController(req, res) {
    const userId = req.userId;
    if (!userId) {
        throw new AppError_1.AppError("Usuário não autenticado", 401);
    }
    const result = await (0, billingService_1.createCheckoutSession)(userId);
    res.status(200).send(result);
}
async function createCustomerPortalSessionController(req, res) {
    const userId = req.userId;
    if (!userId) {
        throw new AppError_1.AppError("Usuário não autenticado", 401);
    }
    const result = await (0, billingService_1.createCustomerPortalSession)(userId);
    res.status(200).send(result);
}
async function stripeWebhookController(req, res) {
    const signature = req.headers["stripe-signature"];
    if (!signature || typeof signature !== "string") {
        throw new AppError_1.AppError("Stripe signature ausente", 400);
    }
    const result = await (0, billingService_1.handleStripeWebhook)(req.body, signature);
    res.status(200).send(result);
}
async function getCheckoutSessionStatusController(req, res) {
    const userId = req.userId;
    if (!userId) {
        throw new AppError_1.AppError("Usuário não autenticado", 401);
    }
    const rawSessionId = req.params.sessionId;
    if (!rawSessionId || Array.isArray(rawSessionId)) {
        throw new AppError_1.AppError("Session ID inválido", 400);
    }
    const result = await (0, billingService_1.getCheckoutSessionStatus)(rawSessionId, userId);
    res.status(200).send(result);
}
