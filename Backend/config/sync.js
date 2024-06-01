const sequelize = require('./db');

const syncDB = async () => {
  try {
    // Sincronizar sin alterar las tablas existentes
    await sequelize.sync({ alter: false });
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database', error);
  }
};

module.exports = syncDB;
