const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(require("./routes/signup"));
app.use(require("./routes/login"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
