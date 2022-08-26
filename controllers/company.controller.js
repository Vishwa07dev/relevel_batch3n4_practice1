//this file contains the logic for handling the company creation and updation
//only admin with approved status is allowed to do so.

const Company = require("../models/company.model");

exports.create = async (req, res) => {
  const companyObjectToStoredInDB = {
    name: req.body.name,
    address: req.body.address,
  };
  if (req.body.verified) {
    //if its provided add it to the companyObj too,else it will take the default value(of pending) by itself in the db
    companyObjectToStoredInDB.verified = req.body.verified;
  }
  const company = await Company.create(companyObjectToStoredInDB);
  return res.status(201).json({
    success: true,
    message: "Company created successfully",
    data: company,
  });
};

exports.update = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id });
    //update the company
    company.name = req.body.name != undefined ? req.body.name : company.name;
    company.address =
      req.body.address != undefined ? req.body.address : company.address;
    company.verified =
      req.body.verified != undefined ? req.body.verified : company.verified;

    const updatedCompany = await company.save();
    return res.status(200).json({
      success: true,
      message: "Company successfully updated.",
      data: updatedCompany,
    });
  } catch (error) {
    console.log("Error while updating company", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating.",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json({
      success: true,
      documentResultsCount: companies.length,
      data: companies,
    });
  } catch (error) {
    console.log("Error while fetching company details.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the data.",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log("Error while fetching company details.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching the data.",
    });
  }
};
