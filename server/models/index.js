const User = require('./user');
const Game = require('./game');
const RecoveryCode = require('./recoveryCode');
const Cart = require('./cart');
const Wishlist = require('./wishList');
const Review = require('./review');

// Orden correcto para eliminar/crear tablas
const models = [
  User,    // Primero las tablas principales
  Game,
  Review,  // Agregar Review
  RecoveryCode,  // Luego las intermedias
  Cart,
  Wishlist
];

// Definir relaciones
const setupAssociations = () => {
  User.hasMany(Game, {
    foreignKey: 'developerId',
    as: 'developedGames'
  });

  Game.belongsTo(User, {
    foreignKey: 'developerId',
    as: 'developer'
  });

  User.hasMany(RecoveryCode, {
    foreignKey: 'email',
    sourceKey: 'email'
  });

  RecoveryCode.belongsTo(User, {
    foreignKey: 'email',
    targetKey: 'email'
  });

  // Relaciones del carrito
  User.belongsToMany(Game, {
    through: Cart,
    foreignKey: 'userId',
    otherKey: 'gameId',
    as: 'cartGames'
  });

  Game.belongsToMany(User, {
    through: Cart,
    foreignKey: 'gameId',
    otherKey: 'userId',
    as: 'inUserCarts'
  });

  // Relaciones de wishlist
  User.belongsToMany(Game, {
    through: Wishlist,
    foreignKey: 'userId',
    otherKey: 'gameId',
    as: 'wishlistGames'
  });

  Game.belongsToMany(User, {
    through: Wishlist,
    foreignKey: 'gameId',
    otherKey: 'userId',
    as: 'inUserWishlists'
  });

  // Asociaciones de Review
  User.hasMany(Review, {
    foreignKey: 'userId'
  });
  Review.belongsTo(User, {
    foreignKey: 'userId'
  });
  
  Game.hasMany(Review, {
    foreignKey: 'gameId'
  });
  Review.belongsTo(Game, {
    foreignKey: 'gameId'
  });
};

module.exports = {
  User,
  Game,
  RecoveryCode,
  Cart,
  Wishlist,
  models,
  setupAssociations
}; 