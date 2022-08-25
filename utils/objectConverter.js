exports.userResponse = (users) => {
    userResult = [];

    users.forEach(user => {
        userResult.push({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            jobsApplied : user.jobsApplied
        })
    });

    return userResult;
}