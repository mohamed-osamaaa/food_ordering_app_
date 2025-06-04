import express from "express";

import { getAllUsers, makeUserAdmin } from "../../controllers/Users/index.js";
import allow from "../../middlewares/allowTo.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, allow("admin"), getAllUsers);
router.post("/:id", verifyToken, allow("admin"), makeUserAdmin);

export default router;
