import express from "express";
import { createBid, getBidsForGig } from "../controllers/bid.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router();

router.post("/", protect, createBid);
router.get("/:gigId", protect, getBidsForGig);

export default router;
