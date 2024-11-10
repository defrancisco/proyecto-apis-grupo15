const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Game = require('./game');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  addedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'Carts',
  schema: 'dbo',
  timestamps: false
});

// Definir las asociaciones
Cart.belongsTo(Game, { 
  foreignKey: 'gameId',
  as: 'Game'
});

Cart.associate = (models) => {
  Cart.belongsTo(models.User, {
    foreignKey: 'userId'
  });
};

module.exports = Cart;
