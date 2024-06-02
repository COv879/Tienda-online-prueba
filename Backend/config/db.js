const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

// Crear una instancia de Sequelize en la base de datos
const Tienda_sequelize = new Sequelize('itnovai_test', 'itnovai_test', 'itnovai_test', {
  host: 'itnovai-test.czny55quvxhk.us-east-1.rds.amazonaws.com',
  dialect: 'mysql', 
  dialectModule: mysql2 // Agregar esta línea de importación para que pueda utilizar el dialecto 'mysql2' en Netlify
});

module.exports = Tienda_sequelize;
