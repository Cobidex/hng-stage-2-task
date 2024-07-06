const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const User = require("./userModel");
const Organisation = require("./organisationModel");

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

module.exports = UserOrganisation;
