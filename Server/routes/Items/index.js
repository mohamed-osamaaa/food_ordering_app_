import express from "express";

import {
    createItem,
    deleteExtraIngredient,
    deleteItem,
    getAllItems,
    getItemById,
    updateItem,
} from "../../controllers/Items/index.js";
import allow from "../../middlewares/allowTo.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/items");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        const fileName = `img-${Date.now()}.${ext}`;
        cb(null, fileName);
    },
});
const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split("/")[0];

    if (imageType === "image") {
        return cb(null, true);
    } else {
        const error = new Error("File must be an image");
        error.status = 400;
        return cb(error, false);
    }
};
const upload = multer({
    storage,
    fileFilter,
});
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post(
    "/",
    verifyToken,
    allow("admin"),
    upload.single("itemImage"),
    createItem
);
router.put("/:id", verifyToken, allow("admin"), updateItem);
router.delete("/:id", verifyToken, allow("admin"), deleteItem);
router.delete("/:id/:name", verifyToken, allow("admin"), deleteExtraIngredient);

export default router;
