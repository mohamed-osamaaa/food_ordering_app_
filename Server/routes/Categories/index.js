import express from "express";

import {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory,
} from "../../controllers/Categories/index.js";
import allow from "../../middlewares/allowTo.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", verifyToken, allow("admin"), createCategory);
router.put("/:id", verifyToken, allow("admin"), updateCategory);
router.delete("/:id", verifyToken, allow("admin"), deleteCategory);

export default router;
