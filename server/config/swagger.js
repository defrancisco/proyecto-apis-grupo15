const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opciones de configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuario',
      version: '1.0.0',
      description: 'Documentación de la API para gestionar el perfil de usuario, autenticación, métodos de pago y wishlist.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api', // Cambia la URL por la correcta en tu entorno
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta donde se encuentran tus archivos de rutas, ajústala según tu estructura
};

// Genera la documentación de la API
const specs = swaggerJsdoc(options);

// Ruta para la interfaz de Swagger UI
const swaggerDocs = (app) => {
  // Configura la interfaz de Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerDocs;
