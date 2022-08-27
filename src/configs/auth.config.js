
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

module.exports = {
    secret : process.env.SECRET,
    tokenHeader : process.env.TOKEN_HEADER
}