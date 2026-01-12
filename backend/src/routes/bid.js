import express from "express";
import { createBid, getBidsForGig, hire, getMyBids } from "../controllers/bid.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router();

// create new bid for a gig
router.post("/", protect, createBid);
// retrieve all made bids
router.get("/my", protect, getMyBids);
// retrieve all bids for a gig
router.get("/:gigId", protect, getBidsForGig);
// hire a bidder
router.patch("/:bidId/hire", protect, hire);

export default router;
