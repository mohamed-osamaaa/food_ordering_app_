import express from "express";
import multer from "multer";

import itemsController from "../../controllers/Items/index.js";
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
router.get("/", itemsController.getItems);
router.get("/itemByCategory/:categoryName", itemsController.getItemsBySameCategory);
router.get("/:itemId", itemsController.getItem);
router.post(
    "/",
    verifyToken,
    allow("admin"),
    upload.single("itemImage"),
    itemsController.createItem
);
router.patch(
    "/:itemId",
    verifyToken,
    allow("admin"),
    itemsController.updateItem
);
router.delete(
    "/:itemId",
    verifyToken,
    allow("admin"),
    itemsController.deleteItem
);
router.delete(
    "/:itemId/:ingredientName",
    verifyToken,
    allow("admin"),
    itemsController.deleteExtraIngredient
);

export default router;
