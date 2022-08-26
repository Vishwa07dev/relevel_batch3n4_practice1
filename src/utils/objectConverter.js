exports.userResponse = (users) => {

    userResult =[];

    //if(users.length)
    users.forEach(user => {
        userResult.push({
            name : user.name,
            userid :user.userId,
            email : user.email,
            userTypes : user.userType,
            userStatus : user.userStatus
        });
    });
    return userResult;

}