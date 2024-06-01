const { Product } = require('../../Backend/models/product');
const { Category } = require('../../Backend/models/category'); 
const { Op } = require('../../Backend/node_modules/sequelize');

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
