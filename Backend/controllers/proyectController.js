const Product = require('../models/product');
const Category = require('../models/category');
const { Op } = require('sequelize');


exports.getProducts = async (req, res) => {
  try {
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

    res.json(productsWithCategoryNames);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};



exports.searchProducts = async (req, res) => {
  const { search } = req.query;
  try {
      // Obtener todos los productos que coinciden con la búsqueda
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
          const categoryName = categories.find(category => category.id === product.category)?.name;
          return {
              ...product.toJSON(),
              categoryName: categoryName || 'Categoría no definida' // Si no se encuentra la categoría, se asigna un valor predeterminado
          };
      });

      res.json(productsWithCategoryNames);
  } catch (error) {
      console.error('Error fetching search results:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};

