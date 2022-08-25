const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const contant = require("../utils/constants");

exports.verifyToken = (req, res, next) => {
    try {
        let headers = req.headers["x-access-token"];

        if (!headers) {
            return res.status(403).send({
                message: "No Token is provided",
            });
        }

        jwt.verify(headers, authConfig.secret, async (err, decode) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized User",
                });
            }
            let user = await User.findOne({ userId: decode.id });

            req.userId = decode.id;
            req.id = user._id;
            req.isAdmin = user.userType == contant.userTypes.admin ? true : false;
            req.isHr = user.userType == contant.userTypes.hr ? true : false;
            req.companyIdForUser = user.companyId ? user.companyId : null;
            req.userType = user.userType;
            req.userStatus =
                user.userStatus === contant.userStatuses.approved ? true : false;

            next();
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            errorMessage: error.message,
        });
    }
};

exports.checkIsValidUserId = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            return res.status(401).send({
                message: "Invalid User ID",
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            errorMessage: error.message,
        });
    }
};

exports.checkIsAdmin = async (req, res, next) => {
    try {
        let user = await User.find({ _id: req.id });

        if (user[0].userType === contant.userTypes.admin) {
            return next();
        }
        return res.status(401).send({
            message: "Don't have permission to access only ADMIN access",
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            errorMessage: error.message,
        });
    }
};
