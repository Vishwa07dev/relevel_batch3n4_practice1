const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");
const { secretKey } = require("../configs/server.config");
// for Hr the status would be pending until an Admin provides a companyId and changes the status
exports.registration = async (req, res) => {
  let statusVal;
  // check if it is an hr , if it is hr then save its userStatus as Pending
  // admin can't be created through an api from outside
  if (req.body.userType == constants.userTypes.hr) {
    statusVal = constants.userStatuses.pending;
  } else {
    statusVal = constants.userStatuses.approved;
  }

  try {
    let newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      userId: req.body.userId,
      password: bcrypt.hashSync(req.body.password, 10),
      companyId: req.body.companyId,
      userType: req.body.userType,
      userStatus: statusVal,
    });
    response = {
      name: newUser.name,
      email: newUser.email,
      userType: newUser.userType,
      userStatus: newUser.userStatus,
      CreatedAt: newUser.createdAt,
    };
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send("Db Error while registering new user");
    console.log(err);
    return;
  }
};

exports.login = async (req, res) => {
  // req.user is provided from middleware
  let token = jwt.sign({ id: req.user.userId }, secretKey, {
    expiresIn: "10m",
  });
  return res
    .status(200)
    .send({ message: "you have been successfully logged in", token });
};
