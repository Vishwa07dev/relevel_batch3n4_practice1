const User = require('./models/user.model')
const Company = require('./models/company.model')
const Job = require('./models/job.model')
const constants = require('./utils/constants')

module.exports = async ()=>{
    try{
        const user = await User.findOne({userId : "admin"})

        if(user){
            console.log("#### ADMIN user is already present ####");
            return;
        }else{
            const admin = await User.create({
                name : "Dharmit Lakhani",
                userId : "admin",
                password : "adminPass123",
                email : "dharmitmailer+jobadmin@gmail.com",
                userType : constants.userType.admin,
            });
            console.log("#### Admin user created ####");

            const company = await Company.create({
                name : "xyz",
            });
            console.log("#### Company created ####");
            console.log(company);

            const userData = [];

            userData[0] = {
                name : "abc student",
                userId : "abc",
                password : "abcPass123",
                email : "abc@gmail.com",
                userType : constants.userType.student,
            };
            
            userData[1] = {
                name : "def student",
                userId : "def",
                password : "defPass123",
                email : "def@gmail.com",
                userType : constants.userType.student,
            };

            userData[2] = {
                name : "pqr hr",
                userId : "pqr",
                password : "pqrPass123",
                email : "pqr@gmail.com",
                userType : constants.userType.hr,
                userCompany : company._id
            };

            userData[3] = {
                name : "mno hr",
                userId : "mno",
                password : "mnoPass123",
                email : "mon@gmail.com",
                userType : constants.userType.hr,
                userCompany : company._id
            };

            const demoUsers = await User.insertMany(userData);
            console.log("#### User data created ####");
            console.log(demoUsers);

            const job = await Job.create({
                title : "Some job title",
                description : "I am too lazy to think of a proper job posting and it's description",
                poster : demoUsers[3]._id,
                status : constants.jobStatus.open
            });
            console.log("#### Job created ####");
            console.log(job);
        }
    }
    catch(err){
        console.log("#### Error in DB initialization #### ", err.message);
    }
}