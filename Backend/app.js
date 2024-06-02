const express = require('express');
const syncDB = require('./config/sync');
const proyectRoutes = require('./routes/proyectRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Sincronizar la base de datos
syncDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas de API
app.use('/api', proyectRoutes);

// configura el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
