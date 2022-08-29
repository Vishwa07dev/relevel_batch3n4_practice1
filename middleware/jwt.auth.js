const User = require("../models/user.model");
const serverConfig = require("../configs/server.config");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");
exports.verifyJWT = async (req, res, next) => {
  // check if token exists
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send("You have to login and provide a token");
  }
  //check if the user is valid
  let userId;
  try {
    userId = jwt.verify(token, serverConfig.secretKey).id;
  } catch (err) {
    return res.status(400).send("You provided an invalid token");
  }
  let user;
  try {
    user = await User.findOne({
      userId: userId,
    });
    if (!user) {
      return res.status(400).send("You have provided a wrong jwt token");
    }
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(500)
      .send("An internal server error has occured please try again later");
  }
};

exports.isAdmin = async (req, res, next) => {
  if (req.user.userType !== constants.userTypes.admin) {
    res.status(400).send("You are not authorized for this request");
  }
  if (req.user.userStatus !== constants.userStatuses.approved) {
    res.status(400).send("You are not yet approved for this request");
  }
  next();
};
