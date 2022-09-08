const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const Job = require("./models/job.model");
const Company = require("./models/company.model");
const seedData = require("./utils/seedData");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Initialize the connection to the mongoDB
 */
mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to mongoDB");
});

require("./Route/userAuth.Route")(app);
require("./Route/jobs.Route")(app);
require("./Route/company.route")(app);
require("./Route/approvals.route")(app);
app.listen(serverConfig.PORT, () => {
  console.log("app is listening at port:", serverConfig.PORT);
});
