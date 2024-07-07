const { Sequelize } = require('sequelize');
const { config } = require('dotenv');

config({ path: './.env'});


const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

module.exports = sequelize;
