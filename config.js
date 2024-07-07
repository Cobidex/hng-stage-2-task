import { Sequelize } from "sequelize";
import { config } from "dotenv";

config({ path: "./.env" });

const { DB_URL, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_URL, {
  dialect: DB_DIALECT,
  logging: false,
});


export default sequelize;
