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
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
    },
    companyId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "companies"
    },
    appliedUsersId:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "users"
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