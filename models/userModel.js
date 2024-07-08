import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import { hashPassword } from "../lib/utils.js";

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'firstName missing',
        },
        notEmpty: {
          msg: 'Must not be empty string',
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'lastName missing',
        },
        notEmpty: {
          msg: 'Must not be empty string',
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email missing',
        },
        notEmpty: {
          msg: 'Must not be empty string',
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password missing',
        },
        notEmpty: {
          msg: 'Must not be empty string',
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'phone missing',
        },
        notEmpty: {
          msg: 'Must not be empty string',
        }
      }
    },
  },
  {
    timestamps: false,
  },
  {
    tableName: "User",
  }
);

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await hashPassword(user.password);
  }
});

export default User;
