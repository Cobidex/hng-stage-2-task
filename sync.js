const sequelize = require('./config.js');
const User = require("./models/userModel.js");
const Organisation = require("./models/organisationModel.js");
const UserOrganisation = require("./models/userOrganisationModel.js");

sequelize
  .sync()
  .then(() => {
    console.log("tables created!");
  })
  .catch((err) => {
    console.error("Unable to create tables:", err);
  });

module.exports = sequelize;
