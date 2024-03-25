require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const databaseUser = process.env.DB_USER;
const uri = `mongodb+srv://${databaseUser}@gym-app-prod.hvqp8qm.mongodb.net/?retryWrites=true&w=majority&appName=gym-app-prod`;


const routes = require("./routes.js");
const { auth } = require("./middlewares/authMiddleware.js");

const app = express();

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

mongoose
  .connect(`mongodb+srv://${databaseUser}@gym-app-prod.hvqp8qm.mongodb.net/gym-app`)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(auth);
app.use(cookieParser());
app.use(routes);

app.listen(5050, () => console.log("Server is listening at port 5050..."));
