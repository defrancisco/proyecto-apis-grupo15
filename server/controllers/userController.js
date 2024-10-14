const User = require('../models/user');
const bcrypt = require('bcrypt');
const Game = require('../models/game');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
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
    const user = await User.findById(req.user.userId).select('-password');
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
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.userType === 'individual') {
      const { name, surname, dateOfBirth, email } = req.body;
      user.name = name || user.name;
      user.surname = surname || user.surname;
      user.email = email || user.email;
      user.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : user.dateOfBirth;
    } else if (user.userType === 'business') {
      const { businessName, email } = req.body;
      user.email = email || user.email;
      user.businessName = businessName || user.businessName;
    }

    user.updatedAt = new Date();
    await user.save();

    res.json({ message: 'Profile updated successfully', user: user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }) });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { gameId } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user.wishlist.includes(gameId)) {
      user.wishlist.push(gameId);
      await user.save();
      await Game.findByIdAndUpdate(gameId, { $inc: { wishlistCount: 1 } });
    }
    res.json({ message: 'Game added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding game to wishlist', error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { gameId } = req.params;
    const user = await User.findById(req.user.userId);
    user.wishlist = user.wishlist.filter(id => id.toString() !== gameId);
    await user.save();
    await Game.findByIdAndUpdate(gameId, { $inc: { wishlistCount: -1 } });
    res.json({ message: 'Game removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing game from wishlist', error: error.message });
  }
};

const addPaymentMethod = async (req, res) => {

};

const removePaymentMethod = async (req, res) => {

}; //estos 2 ultimos los voy a hacer en 1 solo (updatePaymenteMethod) pero por ahora queda.

module.exports = {
  getUserProfile,
  getBusinessProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  addPaymentMethod,
  removePaymentMethod,
};