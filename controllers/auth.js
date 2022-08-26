const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Company = require("../models/company.model");
const authConfig = require("../configs/auth.config");
const constant = require("../utils/constants")

exports.signup = async (req, res) => {
    try {

        let { name, email, password, userId, userType, userStatus, companyId } = req.body;

        if (userType && userType === constant.userTypes.hr) {
            userStatus = constant.userStatuses.pending
        }

        let userDate = {
            name,
            userId,
            email,
            userType,
            password: bcrypt.hashSync(password, 10),
            userStatus,
            companyId
        }

        const userResponse = await User.create(userDate);

        if(companyId){
            const companyResponse = await Company.findOne({_id: companyId});
            companyResponse.hrs.push(userResponse._id)

            await companyResponse.save();
        }
        
        res.status(201).send(userResponse);
    } catch (error) {
        res.status
            (500).send({
                message: 'Some Internal Server Error',
                errorMessage: error.message
            })
    }
}

exports.signin = async (req, res) => {
    try {

        let { email, password } = req.body;

        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(200).send({
                message: `User not found with this email ${email}`
            });
        }

        if (user.userStatus == constant.userStatuses.pending) {
            return res.status(400).send({
                message: "Not yet approved from the admin"
            })
        }

        let passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                message: `Invalid Password`
            });
        }
        const token = jwt.sign(
            {
                id: user.userId
            },
            authConfig.secret,
            {
                expiresIn: 600
            }
        );

        const userDetail = {
            "_id": user._id,
            name: user.name,
            email: user.email,
            userId: user.userId,
            userStatus: user.userStatus,
            userTypes: user.userType,
        }

        res.status(200).send({
            message: `Logged In successfully`,
            userDetail,
            accessToken: token
        });

    } catch (error) {
        res.status
            (500).send({
                message: 'Some Internal Server Error',
                errorMessage: error.message
            })
    }
}