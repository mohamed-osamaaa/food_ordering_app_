import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../../models/users.js";
import generateJWT from "../../utils/generateJWT.js";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });
        }

        const { fullname, email, password, phone, address } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            phone,
            address,
            role: "user", // Default role is 'user'
            profileImage: req.file?.filename || undefined,
        });

        const token = await generateJWT({
            id: user._id,
            role: user.role,
            time: Date.now(),
        });

        await newUser.save();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            data: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone,
                address: newUser.address,
                profileImage: newUser.profileImage,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        const token = await generateJWT({
            id: user._id,
            role: user.role,
            time: Date.now(),
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                profileImage: user.profileImage,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
