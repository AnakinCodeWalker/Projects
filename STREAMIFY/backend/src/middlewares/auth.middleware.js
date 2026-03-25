import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import env from "../config/env.config.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken ||
            req.headers.authorization?.split(" ")[1];;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided",
            });
        }

        const decoded = jwt.verify(token, env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized - User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Unauthorized - Token expired",
            });
        }

        return res.status(401).json({
            message: "Unauthorized - Invalid token",
        });
    }
};

export default protectRoute