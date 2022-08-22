module.exports = async (userModel, jobModel, companyModel, bcrypt) => {
    try {
        await userModel.collection.drop();
        await jobModel.collection.drop();
        await companyModel.collection.drop();
        
        const user1 = await userModel.create({
            username : "user1",
            userId : "u1",
            password : bcrypt.hashSync("userpassword", 8),
            email : "user1@gmail.com",
            jobsApplied : ['SE', 'HR', 'Manager'],
            companiesAppliedFor : ['Relevel', 'Unacademy']
            
        });
        const user2 = await userModel.create({
            username : "user2",
            userId : "u2",
            password : bcrypt.hashSync("userpassword", 8),
            email : "user2@gmail.com",
            jobsApplied : ['SDE'],
            companiesAppliedFor : ['Relevel']
        });
        const user3 = await userModel.create({
            username : "user3",
            userId : "u3",
            password : bcrypt.hashSync("userpassword", 8),
            email : "user3@gmail.com",
            jobsApplied : ['HR'],
            companiesAppliedFor : ['Unacademy']
        });

        const job1 = await jobModel.create({
            jobTitle : "SDE",
            jobBelongsTo : "Relevel",
            jobDescription : "Software Development Engineering",
            jobSeekers : ['u2']
        })
        const job2 = await jobModel.create({
            jobTitle : "SE",
            jobBelongsTo : "Relevel",
            jobDescription : "Software Engineering",
            jobSeekers : ['u1']
        })        
        const job3 = await jobModel.create({
            jobTitle : "HR",
            jobBelongsTo : "Unacademy",
            jobDescription : "Human Resource",
            jobSeekers : ['u1', 'u3']
        })        
        const job4 = await jobModel.create({
            jobTitle : "Manager",
            jobBelongsTo : "Unacademy",
            jobDescription : "Desing Manager",
            jobSeekers : ['u1']
        })

        const company1 = await companyModel.create({
            companyname : "Relevel",
            jobsAvailabe : ['SDE', 'SE'],
            jobSeekers : ['u1', 'u2']
        })
        const company2 = await companyModel.create({
            companyname : "Unacademy",
            jobsAvailabe : ['HR', 'Manager'],
            jobSeekers : ['u1', 'u3']
        })
    }
    catch(err){
        console.log("error while initialising the database with dummy data.", err);
    }
}