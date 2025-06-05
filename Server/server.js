import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import connectDB from "./config/db.js";
import authRoute from "./routes/Auth/index.js";
import cartRoutes from "./routes/Cart/index.js";
import categoriesRoute from "./routes/Categories/index.js";
import itemsRoute from "./routes/Items/index.js";
import ordersRoute from "./routes/Orders/index.js";
import usersRoute from "./routes/Users/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, // Allow cookies to be sent with requests
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(express.json());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/items", itemsRoute);
app.use("/api/cart", cartRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
