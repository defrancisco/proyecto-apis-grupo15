const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true 
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('GETDATE()')
  }
}, {
  tableName: 'Reviews',
  schema: 'dbo',
  timestamps: false
});

module.exports = Review;
