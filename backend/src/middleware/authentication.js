import jwt from "jsonwebtoken";
import { User } from "../model/user"

export async function protect(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: "not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "user not found" });
        }

        req.user = user;
        next();
    } catch {
        return res.status(401).json({ error: "invalid token" });
    }
}
