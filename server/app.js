const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const businessRoutes = require('./routes/business');
const gameRoutes = require('./routes/game');
const sequelize = require('./config/database');
const path = require('path');
const { User, Game, RecoveryCode, Cart, Wishlist, models, setupAssociations } = require('./models');
const cors = require('cors');

// Swagger ~ endpoints
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger'); // Importa el archivo que configuraste para Swagger

// Configura el endpoint de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Otros middlewares y configuraciones
app.use('/uploads', express.static('uploads'));

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.use(express.json());

// Configurar CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  exposedHeaders: ['Access-Control-Allow-Origin']
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/games', gameRoutes);

// Después de las configuraciones de CORS
app.use('/uploads', express.static('uploads'));

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong! :(' });
});

// Conexióna a la base de datos y arranque del servidor
const PORT = process.env.PORT || 3000;

// Sincronizar modelos en orden inverso al definido en models/index.js
const syncDatabase = async () => {
  try {
    await sequelize.sync();
    // Configurar asociaciones
    setupAssociations();
    console.log('Database synced successfully :)');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} :)`);
  });
});
