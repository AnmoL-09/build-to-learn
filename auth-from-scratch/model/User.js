const mongoose = require("../db");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password_hash: String,
});

module.exports = mongoose.model("User", userSchema);
