const companyController = require("../controllers/company.Controller")
const {verifyToken} = require("../middlewears/authJWT")
const {validateCompany} = require("../middlewears")


module.exports = (app) => {
    
    app.post("/jobportal/api/v1/company", [verifyToken, validateCompany.isCompanyPresent], companyController.createCompany)
    
  
}