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
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
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
    type: DataTypes.STRING(16),
    validate: {
      isNumeric: true,
      len: [16, 16]
    }
  },
  cardHolderName: {
    type: DataTypes.STRING(100)
  },
  cardExpirationDate: {
    type: DataTypes.STRING(5), // Formato: MM/YY
    validate: {
      is: /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    }
  },
  cardSecurityCode: {
    type: DataTypes.STRING(3),
    validate: {
      isNumeric: true,
      len: [3, 3]
    }
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
  timestamps: true
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