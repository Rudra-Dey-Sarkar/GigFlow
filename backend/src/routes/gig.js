import express from "express";
import { createGig, getOpenGigs } from "../controllers/gig.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router();

router.get("/", getOpenGigs);
router.post("/", protect, createGig);

export default router;
