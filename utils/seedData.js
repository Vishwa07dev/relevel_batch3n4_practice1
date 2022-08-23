const constants = require("../utils/constants.utils");

const companySeedData = [
  {
    name: "Koogle",
    companyDetails:
      "Software company , we cereate New And Exciting  technologuy for the world",

    contactNo: "000100111",
    emailId: "koogle12yazoo.com",
  },
  {
    name: "yazoo",
    companyDetails: "We are aiming for global peace by 2050",

    contactNo: "000800118",
    emailId: "yazoo12koogle.com",
  },
];
const jobData = [
  {
    jobTitle: "SoftWare Enginner",
    jobDescription: "Work in a dynamic company ",
    jobRole: "Senior Developer",
    jobReportee: "CEO",
    jobQualification: {
      education: constants.educationCompletion.graduation,
      experience: "3yrs",
    },
    companyId: "6303a57d77f1e1ca342e313f",
  },
];

const UserData = [
  {
    firstName: "Jishnu",
    lastName: "singh",
    emailId: "jishnu@gmail.com",
    contactNumber: "9930287611",
    education: constants.educationCompletion.graduation,
    userType: constants.userType.student,

    degree: "SoftWare",
  },
  {
    firstName: "Mahima",
    lastName: "singh",
    emailId: "mayar@gmail.com",
    contactNumber: "9930287221",
    education: constants.educationCompletion.graduation,
    userType: constants.userType.hr,
    degree: "Software",
    companyId: "6303a57d77f1e1ca342e3140",
  },
];

module.exports = { companySeedData, jobData, UserData };
