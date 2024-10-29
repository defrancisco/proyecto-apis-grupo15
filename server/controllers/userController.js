const User = require('../models/user');
const Game = require('../models/game');
const Wishlist = require('../models/wishList');

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

module.exports = {
  getUserProfile,
  getBusinessProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  updatePaymentMethod
};