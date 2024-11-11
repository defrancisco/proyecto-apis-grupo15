const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  userType: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['individual', 'business']]
    }
  },
  name: {
    type: DataTypes.STRING(100)
  },
  surname: {
    type: DataTypes.STRING(100)
  },
  dateOfBirth: {
    type: DataTypes.DATE
  },
  businessName: {
    type: DataTypes.STRING(200)
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cardHolderName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cardExpirationDate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cardSecurityCode: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'Users',
  schema: 'dbo',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email'],
      name: 'users_email_unique'
    }
  ]
});

User.beforeSave(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

User.associate = (models) => {
  User.belongsToMany(models.Game, {
    through: 'Wishlists',
    foreignKey: 'userId',
    otherKey: 'gameId',
    as: 'wishlistGames'
  });
};

module.exports = User;