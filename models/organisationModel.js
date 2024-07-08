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
      validate: {
        notNull: {
          msg: 'name missing',
        },
        notEmpty: {
          msg: 'Must not be empty string',
        }
      }
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
