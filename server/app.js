const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const app = express();

// Rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const businessRoutes = require('./routes/business');
const gameRoutes = require('./routes/game');
const socialRoutes = require('./routes/social');
const contactRoutes = require('./routes/contact');


// Base de datos y modelos
const sequelize = require('./config/database');
const { setupAssociations } = require('./models');

// Configuración de Swagger
const swaggerSpec = require('./config/swagger'); // Importa el archivo de configuración de Swagger
const swaggerDocs = require('./config/swagger');
swaggerDocs(app);

// Middlewares
app.use(express.json());
app.use(cors({
  origin: [
    'https://proyecto-apis-grupo15.onrender.com', process.env.FRONTEND_URL,
    'https://nintendoapigrupo15.web.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use('/uploads', express.static('uploads'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/social', socialRoutes); // Corregido el path para socialRoutes
app.use('/api/', contactRoutes);



// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong! :(' });
});

// Conexión a la base de datos y configuración del servidor
const PORT = process.env.PORT || 3000;

const syncDatabase = async () => {
  try {
    await sequelize.sync();
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
