require('dotenv').config();
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const sendEmail = require('./notificationClient')

exports.accountVerification = (user)=>{
    let token = jwt.sign({id: user._id, purpose: "accountVerification"}, authConfig.secret); // no expiery because we can decode it to get id to resend link if time expired
    sendEmail(
        `Email varification link`,
        `Please verify your account by visiting this link. ${process.env.APP_URL}/job/api/v1/auth/verifyemail/${token}`,
        user.email,
        "Job Portal"
    );
}

exports.jobApplied = (job, applicant, hr)=>{
    sendEmail(
        `New application for ${job.title}`,
        `${applicant.name} has applied for ${job.title}`,
        hr.email,
        "Job Portal"
    );
}

exports.resetPassword = (user)=>{
    let token = jwt.sign({id: user._id, purpose: "resetPassword"}, authConfig.secret); // no expiery because we can decode it to get id to resend link if time expired
    sendEmail(
        `Password reset link`,
        `Reset your password by visiting this link. ${process.env.APP_URL}/job/api/v1/users/resetpassword/${token}`,
        user.email,
        "Job Portal"
    )
}