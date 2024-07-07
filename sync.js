import sequelize from "./config.js";
import User from "./models/userModel.js";
import Organisation from "./models/organisationModel.js";
import UserOrganisation from "./models/userOrganisationModel.js";

sequelize.sync()
  .then(() => {
    console.log("tables created!");
  })
  .catch((err) => {
    console.error("Unable to create tables:", err);
  });

export default sequelize;
