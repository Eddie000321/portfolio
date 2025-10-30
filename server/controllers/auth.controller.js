import jwt from "jsonwebtoken";

import config from "../../config/config.js";
import User from "../models/user.model.js";

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await user.authenticate(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email and password don't match" });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Could not sign in user" });
  }
};

const signout = (_req, res) => {
  res.json({ message: "Signed out" });
};

export default { signin, signout };
