import { DataTypes } from "sequelize";
import sequelize from "../config.js";

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

export default Organisation;
