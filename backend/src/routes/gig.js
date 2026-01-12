import express from "express";
import { createGig, getOpenGigs, getMyGigs, completeGig } from "../controllers/gig.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router();

router.get("/", getOpenGigs);
router.post("/", protect, createGig);
router.get("/my", protect, getMyGigs);
router.patch("/:gigId/complete", protect, completeGig);

export default router;
