const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  JobId: {
    type: String,
    required: true,
    unique: true,
  },

  details: {
    type: String,
    minLength: 10,
    unique: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
  companyAffliatedTO: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "company",
  },
});

module.exports = mongoose.model("job", jobSchema);
