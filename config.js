const { Sequelize } = require('sequelize');
const User = require('./models/User');
const Organisation = require('./models/Organisation');
const UserOrganisation = require('./models/UserOrganisation');

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create tables:', err);
  });

module.exports = sequelize;
