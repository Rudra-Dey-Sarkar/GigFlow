import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authentication.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());

// app check
app.get("/", (req, res) => {
    res.send("App running");
});

// authentication
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
