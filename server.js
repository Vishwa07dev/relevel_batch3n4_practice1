
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const Company = require("./models/company.model");
const Job = require("./models/job.model");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to mongoDB");
  init();
});


async function init() {
try {
  await User.collection.drop();
  await Job.collection.drop();
  await Company.collection.drop();

  const adminUser = await User.create({
    name: "admin",
    userId: "admin",
    password: bcrypt.hashSync("Welcome1", 8),
    email: "admin@email.com",
    userType: "ADMIN",
  });

  // const company = await Company.create({
  //   name: "XYZ Company",
  //   address: "xyz address",
  //   verified: "APPROVED",
  //   companyAdmin : adminUser.userId,
  // });

  const applicantUser = await User.create({
    name: "applicant",
    userId: "applicant",
    password: bcrypt.hashSync("Welcome1", 8),
    email: "applicant@email.com",
    userType: "APPLICANT",
  });

  // const hrUser = await User.create({
  //   name: "hr",
  //   userId: "hr",
  //   password: bcrypt.hashSync("Welcome1", 8),
  //   email: "hr@email.com",
  //   companyId: company._id,
  //   userType: "HR",
  //   userStatus: "APPROVED", 
  // });

  //now place the hr in the company too
  // company.hrs.push(hrUser._id);
  // await company.save();

  // //now the hrUser can post a job
  // const job = await Job.create({
  //   title: "Job",
  //   description: "Description",
  //   company: company._id, //usually it will be picked by login user company
  //   postedBy: hrUser._id,
  // });
  
  // //now update the company jobposted
  // company.jobsPosted.push(job._id);
  // await company.save();

  // //applicant applying a job
  // job.applicants.push(applicantUser._id);
  // await job.save();
  // //also update the applicantUser
  // applicantUser.jobsApplied.push(job._id);
  // await applicantUser.save();
} 
  catch (err) {
    console.log("err in db initialization , " + err);
  }
}



require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/company.route")(app);


module.exports = app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on the port ${serverConfig.PORT}`);
})