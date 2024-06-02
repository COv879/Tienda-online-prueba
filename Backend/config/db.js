const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
 
const Tienda_sequelize = new Sequelize('itnovai_test', 'itnovai_test', 'itnovai_test', {
  host: 'itnovai-test.czny55quvxhk.us-east-1.rds.amazonaws.com',
  dialect: 'mysql', 
  dialectModule: mysql2seña
});

module.exports = Tienda_sequelize;
