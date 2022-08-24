const mongoose = require("mongoose");
const constant = require("../Utils/constant");
const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: ''

    },
    password: {
        type: String,
        required: true,
        unique: true
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
module.exports = mongoose.model('User', UserSchema);