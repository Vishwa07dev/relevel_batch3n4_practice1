//Constants(some fixed value) defined in this file, which can be reused in the project

module.exports = {
  userTypes: {
    admin: "ADMIN",
    applicant: "APPLICANT",
    hr: "HR",
  },
  userStatuses: {
    approved: "APPROVED",
    rejected: "REJECTED",
    pending: "PENDING",
  },
  companyVerificationStatuses: {
    approved: "APPROVED",
    rejected: "REJECTED",
    pending: "PENDING",
  },
  jobStatuses: {
    active: "ACTIVE",
    expired: "EXPIRED",
  },
  nameCheck: /^[a-zA-Z]+$/,
  emailRegex:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  passwordCheck:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i, //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
};
