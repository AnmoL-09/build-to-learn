const express = require("express");
const app = express();
const PORT = 5000;

// Defining a basic GET route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
