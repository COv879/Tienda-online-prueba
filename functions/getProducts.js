const { handler } = require('@netlify/functions');
const Product = require('../Backend/models/product');
const Category = require('../Backend/models/category');
const sequelize = require('../Backend/config/db');

const getProducts = async (event, context) => {
  try {
    await sequelize.authenticate();
    // Obtener todos los productos con su información
    const products = await Product.findAll({
      attributes: ['id', 'name', 'url_image', 'price', 'discount', 'category']
    });

    // Obtener todas las categorías
    const categories = await Category.findAll();

    // Mapear los productos para agregar el nombre de la categoría
    const productsWithCategoryNames = products.map(product => {
      const categoryName = categories.find(category => category.id === product.category)?.name;
      return {
        ...product.toJSON(),
        categoryName: categoryName || 'Categoría no definida' // Si no se encuentra la categoría, se asigna un valor predeterminado
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(productsWithCategoryNames)
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error' })
    };

  }
};

module.exports.handler = handler(getProducts);