import express from "express";

import { addToCart, deleteFromCart, getUserCart } from "../../controllers/Cart/index.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getUserCart)
router.delete("/", verifyToken, deleteFromCart);

export default router;
