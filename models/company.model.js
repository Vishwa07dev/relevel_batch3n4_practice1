const mongoose = require("mongoose");
const constant = require("../Utils/constant");
const CompanySchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    descript: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true,
        default: ''
    },
    companyName: {
        type: String,
        required: true,
        default: ''

    },
    companyPhone: {
        type: String,
        default: ''

    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    jobs: {
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
module.exports = mongoose.model('Companies', CompanySchema);