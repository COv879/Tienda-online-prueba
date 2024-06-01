const { Product } = require('../../Backend/models/product');
const { Category } = require('../../Backend/models/category'); 
const { Op } = require('../../Backend/node_modules/sequelize');
const sequelize = require('../../Backend/config/db');

exports.handler = async (event, context) => {
  try {
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
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error', error: err.message }),
    };
  }
};