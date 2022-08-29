const Company = require("../models/company.model");

exports.create = async (req, res, next) => {
  console.log(true);
  // name
  if (!req.body.name) {
    return res
      .status(400)
      .send("You have to provide a valid name of the compnay");
  }
  req.body.name = req.body.name.trim();
  if (req.body.name.length < 2) {
    return res
      .status(400)
      .send(
        "You have to provide a valid name of the compnay it has to be more than 2 characters"
      );
  }

  try {
    const existingCompany = await Company.findOne({ name: req.body.name });
    if (existingCompany) {
      return res
        .status(400)
        .send(
          "You have to provide a valid new name for the compnay this one already exists"
        );
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("There is an internal server error plaese try this again later");
  }
  //address
  if (!req.body.address) {
    return res
      .status(400)
      .send("You have to provide a valid address of the compnay");
  }
  req.body.address = req.body.address.trim();
  if (req.body.address.length < 20) {
    return res
      .status(400)
      .send(
        "You have to provide a valid address of the company it has to be more than 20 characters"
      );
  }
  next();
};
