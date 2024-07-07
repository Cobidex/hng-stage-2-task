import { Sequelize } from "sequelize";
import { config } from "dotenv";

config({ path: "./.env" });

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

export default sequelize;
