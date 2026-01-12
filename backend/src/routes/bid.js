import express from "express";
import { createBid, getBidsForGig, hire } from "../controllers/bid.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router();

router.post("/", protect, createBid);
router.get("/:gigId", protect, getBidsForGig);
router.patch("/:bidId/hire", protect, hire);

export default router;
