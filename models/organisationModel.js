const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Organisation = sequelize.define(
  "Organisation",
  {
    orgId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  },
  {
    tableName: "Organisation",
  }
);

module.exports = Organisation;