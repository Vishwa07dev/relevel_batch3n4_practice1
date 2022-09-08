const Company = require("../models/company.model");
const constants = require("./constants");
exports.necessaryJobDetails = async (array) => {
  let response = [];
  let filteredArray = await array.filter((element) => {
    return element.status == constants.jobStatuses.active;
  });
  //   console.log(filteredArray);
  for (let x = 0; x < filteredArray.length; x++) {
    let element = filteredArray[x];
    let newObj;
    try {
      let company = await Company.findOne({ _id: element.company });
      newObj = {
        title: element.title,
        description: element.description,
        companyName: company.name,
        companyId: company._id,
      };
      response.push(newObj);
    } catch (err) {
      console.log(err);
      return "an error has occured";
    }
  }
  return response;
};
