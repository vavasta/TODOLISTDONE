const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos");
// const dbRoute = require("./api_client/api");
require("dotenv").config()

var cors = require("cors");
const bodyParser = require("body-parser");

const API_PORT = 5000;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = process.env.dbRoute;

mongoose.connect(dbRoute, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
let db = mongoose.connection;

db.once("open", () => console.log("connected to DB"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(todoRoutes);
app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT API_PORT`));
