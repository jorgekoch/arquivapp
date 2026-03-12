import { Router } from "express";
import {
  createCheckoutSessionController,
  createCustomerPortalSessionController,
  getCheckoutSessionStatusController,
  stripeWebhookController,
} from "../controllers/billingController";
import { authMiddleware } from "../middlewares/authMiddleware";

const billingRouter = Router();

billingRouter.post(
  "/checkout-session",
  authMiddleware,
  createCheckoutSessionController
);

billingRouter.post(
  "/customer-portal",
  authMiddleware,
  createCustomerPortalSessionController
);

billingRouter.post("/webhook", stripeWebhookController);

billingRouter.get(
  "/checkout-session/:sessionId",
  authMiddleware,
  getCheckoutSessionStatusController
);

export default billingRouter;