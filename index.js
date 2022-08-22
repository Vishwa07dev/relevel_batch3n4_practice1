const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const serverConfig = require('./config/server.config');
const dbConfig = require("./config/db.config");
const User = require('./models/user.model')
const Jobs = require('./models/job.model')
const Companies = require('./models/company.model')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", async () => {
    // CREATE USER
    await User.collection.drop();
    const user = await User.create({
        name: "test1",
        email: "test1@gmail.com",
        password: bcrypt.hashSync("password", 10),
        userType: "ADMIN"
    });

    // CREATE JOBS
    await Jobs.collection.drop();
    const job = await Jobs.create({
        title: 'Backend Developer',
        description: 'Create a backend application',
        postedBy: user._id,
        companyName: 'ABC',
        skills: ['nodejs','mongodb'],
    });

    // CREATE Companies
    await Companies.collection.drop();
    await Companies.create({
        companyName: 'ABC',
        description: 'ABC Job',
        jobs: [job._id],
        email: 'abc@abc.com',
    });
    console.log("Connected to mongoDB");
});

const PORT = serverConfig.PORT;

module.exports = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})