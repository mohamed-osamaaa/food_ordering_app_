import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import connectDB from "./config/db.js";
import authRoute from "./routes/Auth/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use("/api/auth", authRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
