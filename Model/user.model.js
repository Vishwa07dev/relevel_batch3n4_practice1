const mongoose = require("mongoose");
const constants = require("../utils/constants.utils");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    enum: [
      constants.educationCompletion.tenth,
      constants.educationCompletion.twelth,
      constants.educationCompletion.graduation,
      constants.educationCompletion.postGraduate,
    ],
    required: true,
  },
  userType: {
    type: String,
    enum: [
      constants.userType.student,
      constants.userType.hr,
      constants.userType.admin,
    ],
    default: constants.userType.student,
  },
  userStatus: {
    type: String,
    enum: [
      constants.userStatus.approved,
      constants.userStatus.pending,
      constants.userStatus.rejected,
    ],
    default: constants.userStatus.pending,
  },
  degree: {
    type: String,
  },
  companyId: {
    // company you are employee of / if hr
    type: mongoose.SchemaTypes.ObjectId,
  },
  jobRequestSentId: {
    // students sending request for jobs
    type: [mongoose.SchemaTypes.ObjectId],
  },
  location: {
    type: String,
    default: "India",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("users", userSchema);
