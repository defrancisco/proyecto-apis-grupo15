const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Wishlist = sequelize.define('Wishlist', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Games',
      key: 'id'
    }
  },
  addedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('GETDATE()')
  }
}, {
  tableName: 'Wishlists',
  schema: 'dbo',
  timestamps: false
});

module.exports = Wishlist;
