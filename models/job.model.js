const mongoose = require("mongoose");
const constants = require("../utils/constants");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    jobStatus: {
        type: String,
        default: "OPEN",
        enum: [constants.jobStatus.open, constants.jobStatus.close]
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    }
});

module.exports = mongoose.model("Job", jobSchema);