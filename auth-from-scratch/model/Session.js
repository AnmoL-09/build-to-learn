const mongoose = require("../db");

const sessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  session_id: { type: String, unique: true },
  expires_at: Date,
});

module.exports = mongoose.model("Session", sessionSchema);
