const { Sequelize } = require('sequelize');
const { config } = require('dotenv');

config({ path: './.env'});


const { DATABASE_URL, DB_DIALECT } = process.env;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: process.env.DB_DIALECT,
  logging: false,
});

module.exports = sequelize;
