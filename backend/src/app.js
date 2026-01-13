import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authentication.js"
import gigRoutes from "./routes/gig.js";
import bidRoutes from "./routes/bid.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const corsOptions = {
  origin: ["https://gig-flow-azure.vercel.app", "http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200
}

const app = express();

// middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// app check
app.get("/", (req, res) => {
    res.send("Server running");
});
// authentication
app.use("/api/auth", authRoutes);
// gigs 
app.use("/api/gigs", gigRoutes);
// bid
app.use("/api/bids", bidRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
