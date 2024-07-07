import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import User from "./userModel.js";
import Organisation from "./organisationModel.js";

const UserOrganisation = sequelize.define(
  "UserOrganisation",
  {
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "userId",
      },
    },
    orgId: {
      type: DataTypes.UUID,
      references: {
        model: Organisation,
        key: "orgId",
      },
    },
  },
  {
    timestamps: false,
  },
  {
    tableName: "UserOrganisation",
  }
);

User.belongsToMany(Organisation, { through: UserOrganisation });
Organisation.belongsToMany(User, { through: UserOrganisation });

export default UserOrganisation;
