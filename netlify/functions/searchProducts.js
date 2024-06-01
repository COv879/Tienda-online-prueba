const { Handler } = require('@netlify/functions');
const { Product } = require('../../Backend/models/product');
const { Category } = require('../../Backend/models/category'); 
const { Op } = require('sequelize');

const handler = async (event, context) => {
  const { search } = event.queryStringParameters;
  try {
    // Buscar productos que coincidan con la búsqueda
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`
        }
      },
      attributes: ['id', 'name', 'url_image', 'price', 'discount', 'category']
    });

    // Obtener todas las categorías
    const categories = await Category.findAll();

    // Mapear los productos para agregar el nombre de la categoría
    const productsWithCategoryNames = products.map(product => {
      // Encontrar el nombre de la categoría correspondiente
      const categoryName = categories.find(category => category.id === product.category)?.name;
      // Devolver el producto con el nombre de la categoría
      return {
        ...product.toJSON(),
        categoryName: categoryName || 'Categoría no definida' // Si no se encuentra la categoría, se asigna un valor predeterminado
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
