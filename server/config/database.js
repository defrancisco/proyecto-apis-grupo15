const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Verificar las variables  
console.log('Verificando variables de entorno:', {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PORT: process.env.DB_PORT
});

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

// ver las tablas BORRAR
async function mostrarTablas() {
  try {
    const tablas = await sequelize.showAllSchemas();
    console.log('Tablas en la base de datos:', tablas);
    
    for (const tabla of tablas) {
      const estructura = await sequelize.query(`DESCRIBE ${tabla.name}`);
      console.log(`Estructura de ${tabla.name}:`, estructura);
    }
  } catch (error) {
    console.error('Error al obtener tablas:', error);
  }
}

mostrarTablas();

module.exports = sequelize;