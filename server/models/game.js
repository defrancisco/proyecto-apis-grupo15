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
  categories: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('categories');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        const validCategories = ['Accion', 'Aventura', 'RPG', 'Estrategia', 'Deporte', 'Simulacion', 'Acertijos'];
        if (!value.every(cat => validCategories.includes(cat))) {
          throw new Error('Categorías inválidas');
        }
        this.setDataValue('categories', JSON.stringify(value));
      }
    }
  },
  operatingSystem: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isIn: [['Windows', 'MacOS', 'Linux', 'Android', 'iOS', 'Nintendo']]
    }
  },
  languages: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: JSON.stringify(['Español']),
    get() {
      const rawValue = this.getDataValue('languages');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('languages', JSON.stringify(value));
      }
    }
  },
  players: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    validate: {
      min: 1,
      max: 10
    }
  },
  minRequirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  recommendedRequirements: {
    type: DataTypes.TEXT,
    allowNull: true
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
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  imageData: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  },
  imageType: {
    type: DataTypes.STRING(50),
    allowNull: true
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