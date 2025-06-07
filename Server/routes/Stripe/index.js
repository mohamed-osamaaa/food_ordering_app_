import express from "express";

import {
    createCheckoutSession,
    stripeWebhook,
    successPageDetails,
} from "../../controllers/Stripe/index.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createCheckoutSession);
router.post("/success", verifyToken, stripeWebhook);
router.get("/successPageDetails", verifyToken, successPageDetails);

export default router;
