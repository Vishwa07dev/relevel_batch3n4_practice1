const mongoose = require("mongoose");
const constant = require("../Utils/constant");
const JobsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    postedBy: {
        type: String,
        required: true
    },
    Aplicants: {
        type: String,
        required: true,
        default: []
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
module.exports = mongoose.model('Jobs', JobsSchema);