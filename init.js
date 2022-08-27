const User = require('./models/user.model')
const Company = require('./models/company.model')
const Job = require('./models/job.model')
const constants = require('./utils/constants')
const bcrypt = require('bcryptjs')

module.exports = async ()=>{
    try{

        await User.collection.drop();
        await Job.collection.drop();
        await Company.collection.drop();

        console.log("#### Collections dropped ####");    

        const user = await User.findOne({username : "admin"})

        if(user){
            console.log("#### Initial data is already present ####");
            return;
        }else{

            const admincompany = await Company.create({
                name : "ADMIN",
            });
            console.log("#### Admin company created ####");


            await User.create({
                name : "Dharmit Lakhani",
                username : "admin",
                password : bcrypt.hashSync("itsonlyDharmit#9", 10),
                email : "dharmitmailer+jobadmin@gmail.com",
                userType : constants.userTypes.admin,
                emailVerified : true,
                companyId : admincompany._id
            });
            console.log("#### Admin user created ####");

            const company = await Company.create({
                name : "Relevel",
                address : "India"
            });
            console.log("#### Company created ####");

            const userData = [];

            userData[0] = {
                name : "abc student",
                username : "abc",
                password : bcrypt.hashSync("abcPass123", 10),
                email : "abc@gmail.com",
                userType : constants.userTypes.student,
                emailVerified : true
            };
            
            userData[1] = {
                name : "def student",
                username : "def",
                password : bcrypt.hashSync("defPass123", 10),
                email : "def@gmail.com",
                userType : constants.userTypes.student,
                emailVerified : true
            };

            userData[2] = {
                name : "pqr hr",
                username : "pqr",
                password : bcrypt.hashSync("pqrPass123", 10),
                email : "pqr@gmail.com",
                userType : constants.userTypes.hr,
                emailVerified : true,
                companyId : company._id
            };

            userData[3] = {
                name : "mno hr",
                username : "mno",
                password : bcrypt.hashSync("mnoPass123", 10),
                email : "mon@gmail.com",
                userType : constants.userTypes.hr,
                emailVerified : true,
                companyId : company._id
            };

            const demoUsers = await User.insertMany(userData);
            company.hr.push(demoUsers[2]._id);
            company.hr.push(demoUsers[3]._id);
            console.log("#### User data created ####");

            const job = await Job.create({
                title : "Some job title",
                description : "I am too lazy to think of a proper job posting and it's description",
                postedBy : demoUsers[3]._id,
                company : company._id
            });
            console.log("#### Job created ####");
        }
    }
    catch(err){
        console.log("#### Error in DB initialization #### ", err.message);
    }
}