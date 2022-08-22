const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    jobs: {
        type: [mongoose.SchemaTypes.ObjectId], 
        ref: "jobs"
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
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

module.exports = mongoose.model("companies", companySchema)