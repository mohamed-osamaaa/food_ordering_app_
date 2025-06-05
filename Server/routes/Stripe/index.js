import express from "express";

import {
    createCheckoutSession,
    stripeWebhook,
} from "../../controllers/Stripe/index.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createCheckoutSession);
router.post("/success", verifyToken, stripeWebhook);

export default router;
