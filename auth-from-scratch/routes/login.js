const express = require("express");
const crypto = require("crypto");
const User = require("../model/User");
const Session = require("../model/Session");
const { verifyPassword } = require("../utils/password");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok)
    return res.status(401).json({ message: "Invalid email or password" });

  await Session.deleteMany({ user_id: user._id });

  const session_id = crypto.randomBytes(32).toString("hex");
  const expires_at = new Date(Date.now() + 15 * 60 * 1000);

  await Session.create({ user_id: user._id, session_id, expires_at });

  res.cookie("session_id", session_id, { httpOnly: true, expires: expires_at });

  res.json({ message: "Logged in" });
});

module.exports = router;
