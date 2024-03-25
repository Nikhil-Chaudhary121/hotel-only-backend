const express = require("express");
const app = express();
const db = require("./db.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./Models/personModel.js");
const MenuItem = require("./Models/MenuItemModel.js");

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel We have a list of Foods");
});


// importing the routers 
const personRoute = require("./routes/personRoute.js")
const MenuRoute = require("./routes/menuRoute.js");

// use the routers 
app.use("/person", personRoute);
app.use("/menu", MenuRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
