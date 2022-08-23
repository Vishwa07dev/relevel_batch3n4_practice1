const mongoose = require("mongoose");
const constants = require("../utils/constants.utils");

const jobSchema = mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  jobReportee: {
    type: String,
    required: true,
  },
  jobQualification: {
    education: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  companyId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
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
module.exports = mongoose.model("jobs", jobSchema);
