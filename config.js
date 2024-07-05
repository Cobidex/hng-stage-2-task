const { Sequelize } = require('sequelize');
const User = require('./models/User');
const Organisation = require('./models/Organisation');
const UserOrganisation = require('./models/UserOrganisation');

const sequelize = new Sequelize('org', 'admin', 'admin', {
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
