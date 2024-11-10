const User = require('../models/user');
const Game = require('../models/game');
const Wishlist = require('../models/wishList');
const Cart = require('../models/cart');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Game,
        as: 'wishlistGames',
        through: { attributes: [] }
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.userType !== 'individual') {
      return res.status(400).json({ message: 'This endpoint is for individual profiles only' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

const getBusinessProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.userType !== 'business') {
      return res.status(400).json({ message: 'This endpoint is for business profiles only' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business profile', error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.userType === 'individual') {
      const { name, surname, dateOfBirth, email } = req.body;
      await user.update({
        name: name || user.name,
        surname: surname || user.surname,
        email: email || user.email,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : user.dateOfBirth
      });
    } else if (user.userType === 'business') {
      const { businessName, email } = req.body;
      await user.update({
        email: email || user.email,
        businessName: businessName || user.businessName
      });
    }

    const updatedUser = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] }
    });
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { gameId } = req.body;
    const userId = req.user.userId;

    const [wishlist, created] = await Wishlist.findOrCreate({
      where: { userId, gameId }
    });

    if (created) {
      await Game.increment('wishlistCount', { where: { id: gameId } });
      res.json({ message: 'Game added to wishlist' });
    } else {
      res.status(400).json({ message: 'Game already in wishlist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding game to wishlist', error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { gameId } = req.params;
    const userId = req.user.userId;
    
    const deleted = await Wishlist.destroy({
      where: { userId, gameId }
    });

    if (deleted) {
      await Game.decrement('wishlistCount', { where: { id: gameId } });
      res.json({ message: 'Game removed from wishlist' });
    } else {
      res.status(404).json({ message: 'Game not found in wishlist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing game from wishlist', error: error.message });
  }
};

const updatePaymentMethod = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { cardNumber, cardHolderName, cardExpirationDate, cardSecurityCode } = req.body;
    
    await user.update({
      cardNumber,
      cardHolderName,
      cardExpirationDate,
      cardSecurityCode
    });

    res.json({ message: 'Payment method updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment method', error: error.message });
  }
};

const addToCartFromWishlist = async (req, res) => {
  try {
    const { userId, gameId } = req.params;

    //si el juego esta en la wishlist del usuario
    const wishlistItem = await Wishlist.findOne({
      where: { userId, gameId }
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Game not found in wishlist' });
    }

    //agregar el juego al carrito
    const [cartItem, created] = await Cart.findOrCreate({
      where: { userId, gameId },
      defaults: { quantity: 1, subtotal: 0 }
    });

    if (!created) {
      const game = await Game.findByPk(gameId);
      const newQuantity = cartItem.quantity + 1;
      const newSubtotal = Number((game.price * newQuantity).toFixed(2));
      await cartItem.update({ 
        quantity: newQuantity,
        subtotal: newSubtotal
      });
    }

    res.json({ message: 'Game added to cart from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding game to cart from wishlist', error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { currentPassword, newPassword } = req.body;
    const isValidPassword = await user.comparePassword(currentPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al actualizar la contraseña', 
      error: error.message 
    });
  }
};

module.exports = {
  getUserProfile,
  getBusinessProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  updatePaymentMethod,
  addToCartFromWishlist,
  updatePassword
};