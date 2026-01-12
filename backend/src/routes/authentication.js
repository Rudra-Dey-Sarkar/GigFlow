import express from "express";
import { register, login, logout } from "../controllers/authentication.js"

const router = express.Router();
// register a new user
router.post("/register", register);
// login a existing user
router.post("/login", login);
// logout a existing user
router.post("/logout", logout);

export default router;
