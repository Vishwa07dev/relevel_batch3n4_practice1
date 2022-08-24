const constants = require("./constants");

module.exports = async (userModel, jobModel, companyModel, bcrypt) => {
    try {
        await userModel.collection.drop();
        await jobModel.collection.drop();
        await companyModel.collection.drop();
        
        const user1 = await userModel.create({
            userName : "user1",
            userId : "u1",
            password : bcrypt.hashSync("userpassword", 8),
            email : "user1@gmail.com",
            userType : constants.userType.student,
            jobsApplied : []
        });
        const user2 = await userModel.create({
            userName : "user2",
            userId : "u2",
            password : bcrypt.hashSync("userpassword", 8),
            email : "user2@gmail.com",
            userType : constants.userType.hr,
            jobsPosted : []
        });
        const user3 = await userModel.create({
            userName : "user3",
            userId : "u3",
            password : bcrypt.hashSync("userpassword", 8),
            email : "user3@gmail.com",
            userType : constants.userType.admin
        });

        const job1 = await jobModel.create({
            jobTitle : "SDE",
            jobBelongsTo : "Relevel",
            jobDescription : "Software Development Engineering",
            jobSeekers : []
        })
        const job2 = await jobModel.create({
            jobTitle : "SE",
            jobBelongsTo : "Relevel",
            jobDescription : "Software Engineering",
            jobSeekers : []
        })        
        const job3 = await jobModel.create({
            jobTitle : "HR",
            jobBelongsTo : "Unacademy",
            jobDescription : "Human Resource",
            jobSeekers : []
        })        
        const job4 = await jobModel.create({
            jobTitle : "Manager",
            jobBelongsTo : "Unacademy",
            jobDescription : "Desing Manager",
            jobSeekers : []
        })

        const company1 = await companyModel.create({
            companyName : "Relevel",
            jobsAvailabe : [],
            jobSeekers : []
        })
        const company2 = await companyModel.create({
            companyName : "Unacademy",
            jobsAvailabe : [],
            jobSeekers : []
        })
    }
    catch(err){
        console.log("error while initialising the database with dummy data.", err);
    }
}