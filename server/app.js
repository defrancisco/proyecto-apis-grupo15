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

app.use(express.json());

// Configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

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
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

// Sincronizar modelos en orden inverso al definido en models/index.js
const syncDatabase = async () => {
  try {
    await sequelize.sync();
    
    // Configurar asociaciones
    setupAssociations();
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
