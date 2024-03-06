const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes.js");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/gym-membership-app")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.get("/", (req, res) => {
  res.send("YO MFFF");
});

app.listen(5050, () => console.log("Server is listening at port 5050..."));
