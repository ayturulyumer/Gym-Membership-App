const express = require("express");
const mongoose = require("mongoose")

const routes = require("./routes.js");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/gym-membership-app")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Acess-Control-Allow-Origin", "*");
  res.setHeader("Acess-Control-Allow-Methods", "*");
  res.setHeader("Acess-Control-Allow-Headers", "*");
  
  next();
});

app.get("/", (req, res) => {
  res.send("YO MFFF");
});

app.use(routes);

app.listen(5050, () => console.log("Server is listening at port 5050..."));
