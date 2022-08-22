const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    skills: {
        type: [],
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: Date.now()
    },
})

module.exports = mongoose.model("jobs", jobSchema)