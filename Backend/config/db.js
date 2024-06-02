require ('dotenv').config(); 
const { Sequelize } = require('sequelize');
 
const Tienda_sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'
});

module.exports = Tienda_sequelize;
