const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// describe el modelo de la tabla "category" de la base de datos
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'category', // Nombre correcto de la tabla
  timestamps: false
});


module.exports = Category;
