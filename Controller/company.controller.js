const Company = require("../models/company.model");

exports.create = async (req, res) => {
  console.log(true);
  const newObj = {
    name: req.body.name,
    address: req.body.address,
  };
  try {
    const company = await Company.create(newObj);
    let message = company;
    res.status(201).send(company);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("internal server error, please try again later");
  }
};
