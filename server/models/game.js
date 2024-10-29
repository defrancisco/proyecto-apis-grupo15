const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Simulation', 'Puzzle', 'Other']]
    }
  },
  operatingSystem: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isIn: [['Windows', 'MacOS', 'Linux', 'Android', 'iOS']]
    }
  },
  language: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'English'
  },
  players: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    validate: {
      min: 1,
      max: 8
    }
  },
  rating: {
    type: DataTypes.STRING(5),
    allowNull: false,
    validate: {
      isIn: [['E', 'E10+', 'T', 'M', 'A']]
    }
  },
  developerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    validate: {
      async isDeveloperBusiness(value) {
        const developer = await sequelize.models.User.findByPk(value);
        if (!developer || developer.userType !== 'business') {
          throw new Error('Developer must be a business account');
        }
      }
    }
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  purchases: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  wishlistCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  averageRating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('GETDATE()')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('GETDATE()')
  }
}, {
  tableName: 'Games',
  schema: 'dbo',
  timestamps: true
});

Game.associate = (models) => {
  Game.belongsTo(models.User, {
    foreignKey: 'developerId',
    as: 'developer'
  });
};

module.exports = Game;