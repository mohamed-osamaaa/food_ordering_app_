import express from "express";

import { getAllUsers, makeUserAdmin, searchByName } from "../../controllers/Users/index.js";
import allow from "../../middlewares/allowTo.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, allow("admin"), getAllUsers);
router.post("/search", verifyToken, allow("admin"), searchByName);
router.post("/:userId", verifyToken, allow("admin"), makeUserAdmin);

export default router;
