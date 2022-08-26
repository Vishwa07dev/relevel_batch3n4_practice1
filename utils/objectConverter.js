exports.userResponse = (users) => {
    userResult = [];

    users.forEach(user => {
        userResult.push({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            jobsApplied : user.jobsApplied,
            companyId : user.companyId
        })
    });

    return userResult;
}

exports.companyResponse = (companies) => {
    companyResult = [];

    companies.forEach(company => {
        companyResult.push({
            name : company.name,
            address : company.address,
            jobsPosted : company.jobsPosted,
            hrs : company.hrs
        })
    });

    return companyResult;
}