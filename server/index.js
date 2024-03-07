const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const routes = require("./routes.js");
const { auth } = require("./middlewares/authMiddleware.js");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/gym-membership-app")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(auth);
app.use(routes);



app.listen(5050, () => console.log("Server is listening at port 5050..."));
