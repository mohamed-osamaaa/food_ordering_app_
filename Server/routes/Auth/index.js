import express from "express";
import multer from "multer";

import { login, register } from "../../controllers/Auth/index.js";
import {
    validateLogin,
    validateRegister,
} from "../../middlewares/authValidation.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/users");
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

router.post(
    "/register",
    validateRegister,
    upload.single("profileImage"),
    register
);
router.post("/login", validateLogin, login);
router.get("/check-auth", verifyToken, (req, res) => {
    const user = req.currentUser;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access!",
        });
    }

    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        data: {
            user,
        },
    });
});
export default router;
