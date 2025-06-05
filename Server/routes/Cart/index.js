import express from "express";

import { addToCart, deleteFromCart } from "../../controllers/Cart/index.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.delete("/:itemId", verifyToken, deleteFromCart);

export default router;
