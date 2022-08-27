const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dbConfig = require("./src/configs/db.config");
const serverConfig = require("./src/configs/server.config");
const init = require('./src/init');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

/**
 * Initialize the connection to the mongoDB
 */
mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to mongoDB");
  init();
});

require('./src/routes/auth.route')(app);
require('./src/routes/job.route')(app);
require('./src/routes/user.route')(app);
require('./src/routes/company.route')(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is up and running in the port no : ${serverConfig.PORT}`);
});