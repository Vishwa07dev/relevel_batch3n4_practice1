const User = require('./models/user.model')
const Compney = require('./models/compney.model')
const constants = require('./utils/constants')

module.exports = async ()=>{
    try{
        const user = await User.findOne({userId : "admin"})

        if(user){
            console.log("#### ADMIN user is already present ####");
            return;
        }else{
            await User.create({
                name : "Dharmit Lakhani",
                userId : "admin",
                password : "adminPass123",
                email : "dharmitmailer+jobadmin@gmail.com",
                userType : constants.userType.admin,
            });
            console.log("#### Admin user created ####");

            await Compney.create({
                name : "xyz",
            });
            console.log("#### Compney created ####");

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
                userCompney : "xyz"
            };

            userData[3] = {
                name : "mno hr",
                userId : "mno",
                password : "mnoPass123",
                email : "mon@gmail.com",
                userType : constants.userType.hr,
                userCompney : "xyz"
            };

            await User.insertMany(userData);
            console.log("#### User data created ####");
        }
    }
    catch(err){
        console.log("#### Error in DB initialization #### ", err.message);
    }
}