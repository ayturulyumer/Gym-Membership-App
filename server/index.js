const express = require("express");

const routes = require("./routes.js");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("YO MFFF");
});

app.use(routes);

app.listen(5050, () => console.log("Server is listening at port 5050..."));
