const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const serverConfig = require("./config/server.config");

const Company = require("./Model/company.model");
const User = require("./Model/user.model");
const Job = require("./Model/job.model");

const seedData = require("./utils/seedData");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("successfully reached");
  res.status(200).send("Connected!");
});

mongoose.connect(serverConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Some err while connecting to db");
});
db.once("open", () => {
  console.log("connected");
});
async function init() {
  try {
    await User.insertMany(seedData.UserData);
    console.log("Data entered into user");
    await Company.insertMany(seedData.companySeedData);
    console.log("Data entered into user");
    await Job.insertMany(seedData.jobData);
    console.log("Data entered into user");
  } catch (err) {
    console.log(err);
  }
}
init();

app.listen(serverConfig.PORT, () => {
  console.log("started the server");
});
