import express from "express";
import { createGig, getOpenGigs, getMyGigs, completeGig } from "../controllers/gig.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router();
// retrieve all open gigs
router.get("/", getOpenGigs);
// create a new gig
router.post("/", protect, createGig);
// retrieve all owned gigs
router.get("/my", protect, getMyGigs);
// mark gig as completed 
router.patch("/:gigId/complete", protect, completeGig);

export default router;
