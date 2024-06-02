const { handler } = require('@netlify/functions');
import { Sequelize } from 'sequelize';
const Product = require('../Backend/models/product');
const Category = require('../Backend/models/category');
import mysql2 from 'mysql2';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectModule: mysql2,
});

exports.handler = async (event, context) => {
  try {
    await sequelize.authenticate();
    
    const products = await Product.findAll({
      attributes: ['id', 'name', 'url_image', 'price', 'discount', 'category']
    });

    const categories = await Category.findAll();
    
    const productsWithCategoryNames = products.map(product => {
      const categoryName = categories.find(category => category.id === product.category)?.name;
      return {
        ...product.toJSON(),
        categoryName: categoryName || 'Categoría no definida'
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(productsWithCategoryNames),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error', error: error.message }),
    };
  }
};
