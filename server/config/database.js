// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre_base_datos', 'CloudSA1fb8f7cc', 'contraseña', {
  host: 'sv-nintendo-api.database.windows.net', // Cambia al host de tu servidor SQL de Azure
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // Azure requiere conexión encriptada
      trustServerCertificate: false
    }
  },
  port: 1433 // Asegúrate de usar el puerto correcto
});

sequelize
  .authenticate()
  .then(() => console.log('Connected to SQL Server on Azure'))
  .catch(err => console.error('Error connecting to SQL Server on Azure:', err));

module.exports = sequelize;