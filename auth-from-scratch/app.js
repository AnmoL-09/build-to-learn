const express = require("express");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(require("./routes/signup"));
app.use(require("./routes/login"));

app.get("/protected", auth, (req, res) => {
  res.json({ user: req.user_id });
});

app.post("/logout", async (req, res) => {
  const sid = req.cookies.session_id;
  if (sid) await Session.deleteOne({ session_id: sid });

  res.clearCookie("session_id");
  res.json({ message: "Logged out" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
