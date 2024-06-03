const { Handler } = require('@netlify/functions');
const sequelize = require('../Backend/config/db');
const Product = require('../Backend/models/product');
const Category = require('../Backend/models/category');


/*exports.handler = async (event, context) => {
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
};*/

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

    const productsGroupedByCategory = categories.map(category => {
      return {
        category: category.name,
        products: productsWithCategoryNames.filter(product => product.category === category.id)
      };
    });

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