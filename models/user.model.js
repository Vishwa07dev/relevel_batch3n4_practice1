const mongoose = require('mongoose');
const constant = require('../utils/constant');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
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
    userType: {
        type: String,
        required: true,
        default: constant.userTypes.user,
        enum: [
            constant.userTypes.user,
            constant.userTypes.hr,
            constant.userTypes.admin
        ]
    },
    jobsApplied: {
        type: [mongoose.SchemaTypes.ObjectId], 
        ref: "jobs"
    },
    jobsPosted: {
        type: [mongoose.SchemaTypes.ObjectId], 
        ref: "jobs"
    }
})

module.exports = mongoose.model("users", userSchema)