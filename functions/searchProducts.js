const { handler } = require('@netlify/functions');
const { Op } = require('sequelize');
const Product = require('../Backend/models/product');
const Category = require('../Backend/models/category');
const sequelize = require('../Backend/config/db');


exports.handler = async (event, context) => {
  try {
    await sequelize.authenticate();

    const searchQuery = event.queryStringParameters.search || '';

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${searchQuery}%`
        }
      },
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

    const productsGroupedByCategory = categories.map(category => {
      return {
        category: category.name,
        products: productsWithCategoryNames.filter(product => product.category === category.id)
      };
    }).filter(group => group.products.length > 0);

    return {
      statusCode: 200,
      body: JSON.stringify(productsGroupedByCategory),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error', error: error.message }),
    };
  }
};
