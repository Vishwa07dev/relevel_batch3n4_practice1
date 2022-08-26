const User = require("../models/user.model");
const Comapny = require("../models/company.model");

const constants = require("../utils/constants");

validateJobBody = async (req,res,next)=>{
    // validate if title is present
    if(!req.body.title){
        return res.status(400).send({
            message:"Failed! job title is not provided"
        })
    }
    if(!req.body.description){
        return res.status(400).send({
            message:"Job description is not provided"
        })
    } 
   
    if(!req.body.company){
        return res.status(400).send({
            message:"Failed!  company id is not provided"
        })
    }
    try{
        const company = await Comapny.findOne({_id:req.params.company}) // why its returns null
        console.log(company);
        if(company == null){
            return res.status(400).send({
                message:"Failed!  This is not a valid company"
            })
        }
    }catch(err){
        return res.status(400).send({
            message:"Internal Error while validaing the request"
        })
    }
    

   
    if(!req.body.postedBy){
        return res.status(400).send({
            message:"Failed!  job creater detail is not provided"
        })
    }
    try{
        const user = await User.findOne({_id:req.body.userId}) // why its returns null
        console.log(user);
        if(user == null){
            return res.status(400).send({
                message:"Prvide the id of job creater"
            })
        }
    }catch(err){
        return res.status(400).send({
            message:"Internal Error while validaing the request"
        })
    }

   
    next();
}
 

const  verifyJobBody ={
   validateJobBody:validateJobBody
}
module.exports = verifyJobBody;