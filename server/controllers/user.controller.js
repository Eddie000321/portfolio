import extend from "lodash/extend.js";
import User from "../models/user.model.js";
import dbErrorHandler from "../helpers/dbErrorHandler.js";

const sanitizeUser = (user) => {
  const sanitized = user.toObject();
  delete sanitized.hashed_password;
  delete sanitized.__v;
  return sanitized;
};

const create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "Successfully signed up!",
      user: sanitizeUser(user),
    });
  } catch (err) {
    res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const list = async (_req, res) => {
  try {
    const users = await User.find().select("name email created updated");
    res.json(users);
  } catch (err) {
    res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  } catch (_err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};

const read = (req, res) => {
  res.json(sanitizeUser(req.profile));
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user = extend(user, req.body);
    await user.save();
    res.json(sanitizeUser(user));
  } catch (err) {
    res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    const user = req.profile;
    await user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (_req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete users",
    });
  }
};

export default { create, userByID, read, list, remove, removeAll, update };
