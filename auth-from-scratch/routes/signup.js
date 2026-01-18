const express = require("express");
const User = require("../model/User");
const { hashPassword } = require("../utils/password");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email exits" });

  const password_hash = await hashPassword(password);

  await User.create({
    name,
    email,
    password_hash,
  });

  res.json({ message: "User created" });
});

module.exports = router;
