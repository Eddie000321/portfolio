import jwt from "jsonwebtoken";

import config from "../../config/config.js";
import User from "../models/user.model.js";

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
};

export const requireAuth = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id).select(
      "_id name email role"
    );
    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }
    req.auth = { id: user._id.toString(), role: user.role };
    req.user = user;
    next();
  } catch (_err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.auth?.role !== "admin") {
    return res.status(403).json({ error: "Admin privileges required" });
  }
  next();
};

export const requireSelfOrAdmin = (req, res, next) => {
  if (req.auth?.role === "admin") {
    return next();
  }
  if (req.profile && req.profile._id.toString() === req.auth?.id) {
    return next();
  }
  return res.status(403).json({ error: "User is not authorized" });
};
