import express from "express";

import { getOrder, getOrders } from "../../controllers/Orders/index.js";
import allow from "../../middlewares/allowTo.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, allow("admin"), getOrder);
router.get("/:id", verifyToken, allow("admin"), getOrders);

export default router;
