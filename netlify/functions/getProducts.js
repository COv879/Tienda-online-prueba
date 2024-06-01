const { Handler } = require('@netlify/functions');
const { Product } = require('../../Backend/models/product');
const { Category } = require('../../Backend/models/category'); 
const { Op } = require('sequelize');

const handler = async (event, context) => {
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
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error', error }),
    };
  }
};

module.exports = { handler };
