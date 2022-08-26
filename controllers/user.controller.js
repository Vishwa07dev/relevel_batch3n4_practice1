//this file contains the logic for handling the User Resource

const User = require("../models/user.model");
const Company = require("../models/company.model");

const {
  filterUserSetResponse,
  filterUserResponse,
} = require("../utils/objectConverter");
const { userTypes } = require("../utils/constants");

//get all the list of the users
exports.findAllUsers = async (req, res) => {
  const queryObj = {};
  //if optional queryParam passed along with the request,then add them to the queryObj

  if (req.query.userType) {
    queryObj.userType = req.query.userType;
  }
  if (req.query.userStatus) {
    queryObj.userStatus = req.query.userStatus;
  }

  try {
    const users = await User.find(queryObj);
    return res.status(200).json({
      success: true,
      documentResultsCount: users.length,
      data: filterUserSetResponse(users),
    });
  } catch (error) {
    console.error("Error while fetching all the users", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get a single user based on userId
exports.findByUserId = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });

    // user validation would have happened in the middleware itself
    return res.status(200).json({
      success: true,
      data: filterUserResponse(user),
    });
  } catch (error) {
    console.error("Error while searching the user ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//update user
//name,userStatus detail
exports.update = async (req, res) => {
  try {
    //isAdminOrOwner already checked in the middleware
    //get the userdetails which to be updated
    const user = await User.findOne({ userId: req.params.id });
    //check if currently SignIn user ,userType is Admin(and having approvedUserStatus), then only allow the User to update UserStatus otherwise,keep userStatus remain same
    if (req.body.userStatus) {
      const signedInUser = await User.findOne({ userId: req.userId });
      if (signedInUser.userType === userTypes.admin) {
        user.userStatus = req.body.userStatus;
      }
    }
    //name,company update is allowed
    if (req.body.name) {
      //update user name
      user.name = req.body.name;
    }
    if (req.body.companyId) {
      //update the company
      //ensure whether the given companyID is valid companyId, already done in middleware
      user.companyId = req.body.companyId;

      //also update in the compnay hrs list
      const company = await Company.findOne({ _id: req.body.companyId });
      //if user is not already in the compnay hrs list,then only push
      if (!company.hrs.includes(user._id)) {
        company.hrs.push(user._id);
        await company.save();
      }
    }
    //save the user in the db
    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error while updating user", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
