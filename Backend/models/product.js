const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./category');

// describe el modelo de la tabla "product" de la base de datos
const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url_image: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discount: {
    type: DataTypes.INTEGER
  },
  category: {
    type: DataTypes.INTEGER, // Debe coincidir con el tipo de dato de la columna en la base de datos
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  tableName: 'product',
  timestamps: false
});

Product.belongsTo(Category, { foreignKey: 'category', targetKey: 'id' });

module.exports = Product;
