// searchProducts.js
const { Op } = require('sequelize');
const Product = require('../Backend/models/product');
const Category = require('../Backend/models/category');

exports.handler = async (event, context) => {
  const { search } = event.queryStringParameters;
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`
        }
      },
      attributes: ['id', 'name', 'url_image', 'price', 'discount', 'category']
    });

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
      body: JSON.stringify(products)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error' })
    };
  }
};
