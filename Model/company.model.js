const mongoose = require("mongoose");
const constants = require("../utils/constants.utils");

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    requires: true,
  },
  contactNo: {
    type: String,
    requires: true,
  },
  emailId: {
    type: String,
    requires: true,
  },
  jobIds: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  employeeId: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  studentId: {
    type: [mongoose.SchemaTypes.ObjectId],
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
module.exports = mongoose.model("companies", companySchema);
