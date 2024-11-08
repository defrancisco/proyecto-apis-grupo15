const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RecoveryCode = sequelize.define('RecoveryCode', {
  email: {
    type: DataTypes.STRING(255),
    primaryKey: true,
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
}, {
  tableName: 'RecoveryCodes',
  schema: 'dbo'
});

module.exports = RecoveryCode;