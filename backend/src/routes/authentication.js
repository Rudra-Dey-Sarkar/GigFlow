import express from "express";
import { register, login, logout, me } from "../controllers/authentication.js"
import { protect } from "../middleware/authentication.js";

const router = express.Router();
// register a new user
router.post("/register", register);
// login a existing user
router.post("/login", login);
// logout a existing user
router.post("/logout", logout);
// login check
router.get("/me", protect, me);

export default router;
