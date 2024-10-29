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
    unique: true
  },
  code: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('GETDATE()'),
  }
}, {
  tableName: 'RecoveryCodes',
  schema: 'dbo',
  timestamps: true,
  updatedAt: false,
});

module.exports = RecoveryCode;