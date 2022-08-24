<<<<<<< HEAD
module.exports = {
    DB_URL : "mongodb://localhost/jobsearchdb"
}
=======
if (process.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  DB_URI: process.env.DB_URI,
};
>>>>>>> 025ca315d4530f5c7d428b5afe9f357246ca161e
