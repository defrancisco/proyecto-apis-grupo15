const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RecoveryCode = sequelize.define('RecoveryCode', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: {
      model: 'Users',
      key: 'email'
    }
  },
  code: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = RecoveryCode;