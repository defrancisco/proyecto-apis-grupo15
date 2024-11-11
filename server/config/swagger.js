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

/**
 * @swagger
 * /api/contact-requests:
 *   post:
 *     summary: Enviar una solicitud de contacto
 *     tags:
 *       - Contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               message:
 *                 type: string
 *                 example: "Hola, me gustaría obtener más información sobre su producto."
 *     responses:
 *       200:
 *         description: Mensaje enviado con éxito
 *       400:
 *         description: Todos los campos son obligatorios
 *       500:
 *         description: Error en el servidor
 */
