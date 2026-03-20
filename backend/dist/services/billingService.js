"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = createCheckoutSession;
exports.createCustomerPortalSession = createCustomerPortalSession;
exports.handleStripeWebhook = handleStripeWebhook;
exports.getCheckoutSessionStatus = getCheckoutSessionStatus;
const AppError_1 = require("../errors/AppError");
const stripeService_1 = require("./stripeService");
const userRepository_1 = require("../repositories/userRepository");
async function createCheckoutSession(userId) {
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    if (user.plan === "PRO") {
        throw new AppError_1.AppError("Você já possui acesso ao plano PRO. Use o portal para gerenciar sua assinatura.", 400);
    }
    let stripeCustomerId = user.stripeCustomerId;
    if (stripeCustomerId) {
        try {
            await stripeService_1.stripe.customers.retrieve(stripeCustomerId);
        }
        catch {
            stripeCustomerId = null;
        }
    }
    if (!stripeCustomerId) {
        const customer = await stripeService_1.stripe.customers.create({
            email: user.email,
            name: user.name,
            metadata: {
                userId: String(user.id),
            },
        });
        stripeCustomerId = customer.id;
        await (0, userRepository_1.updateUserBillingData)(user.id, {
            stripeCustomerId,
            stripeSubscriptionId: null,
            subscriptionStatus: null,
            plan: "FREE",
        });
    }
    const session = await stripeService_1.stripe.checkout.sessions.create({
        mode: "subscription",
        customer: stripeCustomerId,
        line_items: [
            {
                price: process.env.STRIPE_PRO_PRICE_ID,
                quantity: 1,
            },
        ],
        allow_promotion_codes: true,
        success_url: `${process.env.FRONTEND_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/`,
        metadata: {
            userId: String(user.id),
            targetPlan: "PRO",
        },
    });
    if (!session.url) {
        throw new AppError_1.AppError("Não foi possível iniciar o checkout", 500);
    }
    return {
        url: session.url,
    };
}
async function createCustomerPortalSession(userId) {
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    if (!user.stripeCustomerId) {
        throw new AppError_1.AppError("Cliente Stripe não encontrado para este usuário", 400);
    }
    const portalSession = await stripeService_1.stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.FRONTEND_URL}/dashboard`,
    });
    return {
        url: portalSession.url,
    };
}
async function handleStripeWebhook(rawBody, signature) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        throw new AppError_1.AppError("Webhook secret do Stripe não configurado", 500);
    }
    let event;
    try {
        event = stripeService_1.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    }
    catch {
        throw new AppError_1.AppError("Assinatura do webhook inválida", 400);
    }
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            if (session.mode !== "subscription")
                break;
            const customerId = typeof session.customer === "string" ? session.customer : null;
            const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;
            if (!customerId)
                break;
            const user = await (0, userRepository_1.findUserByStripeCustomerId)(customerId);
            if (!user)
                break;
            await (0, userRepository_1.updateUserBillingData)(user.id, {
                stripeCustomerId: customerId,
                stripeSubscriptionId: subscriptionId,
                subscriptionStatus: "pending",
            });
            break;
        }
        case "invoice.paid": {
            const invoice = event.data.object;
            const customerId = typeof invoice.customer === "string" ? invoice.customer : null;
            if (!customerId)
                break;
            const user = await (0, userRepository_1.findUserByStripeCustomerId)(customerId);
            if (!user)
                break;
            await (0, userRepository_1.updateUserBillingData)(user.id, {
                plan: "PRO",
                stripeCustomerId: customerId,
                subscriptionStatus: "active",
            });
            break;
        }
        case "invoice.payment_failed": {
            const invoice = event.data.object;
            const customerId = typeof invoice.customer === "string" ? invoice.customer : null;
            if (!customerId)
                break;
            const user = await (0, userRepository_1.findUserByStripeCustomerId)(customerId);
            if (!user)
                break;
            await (0, userRepository_1.updateUserBillingData)(user.id, {
                subscriptionStatus: "past_due",
            });
            break;
        }
        case "customer.subscription.updated": {
            const subscription = event.data.object;
            const user = await (0, userRepository_1.findUserByStripeSubscriptionId)(subscription.id);
            if (!user)
                break;
            const keepsProAccess = subscription.status === "active" || subscription.status === "trialing";
            await (0, userRepository_1.updateUserBillingData)(user.id, {
                plan: keepsProAccess ? "PRO" : "FREE",
                stripeSubscriptionId: subscription.id,
                subscriptionStatus: subscription.status,
            });
            break;
        }
        case "customer.subscription.deleted": {
            const subscription = event.data.object;
            const user = await (0, userRepository_1.findUserByStripeSubscriptionId)(subscription.id);
            if (!user)
                break;
            await (0, userRepository_1.updateUserBillingData)(user.id, {
                plan: "FREE",
                subscriptionStatus: "canceled",
            });
            break;
        }
    }
    return { received: true };
}
async function getCheckoutSessionStatus(sessionId, userId) {
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    const session = await stripeService_1.stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
        throw new AppError_1.AppError("Sessão de checkout não encontrada", 404);
    }
    const sessionCustomerId = typeof session.customer === "string" ? session.customer : null;
    if (!sessionCustomerId || sessionCustomerId !== user.stripeCustomerId) {
        throw new AppError_1.AppError("Sessão de checkout não pertence a este usuário", 403);
    }
    return {
        id: session.id,
        status: session.status,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_details?.email ?? user.email,
    };
}
