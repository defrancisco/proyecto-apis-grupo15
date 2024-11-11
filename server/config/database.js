const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });



const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: false,
      enableArithAbort: true
    }
  },
  logging: false 
});

// TEST CONEXION 
sequelize
  .authenticate()
  .then(() => console.log('SIUUUU'))
  .catch(err => console.error('NOOOOO', err));


module.exports = sequelize;