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
    const gameId = req.params.gameId;
    const userId = req.user.userId;

    // Verificar si el juego ya está en la wishlist
    const existingWishlistItem = await Wishlist.findOne({
      where: { userId, gameId }
    });

    if (existingWishlistItem) {
      return res.status(400).json({ message: 'El juego ya está en tu lista de deseos' });
    }

    // Crear nuevo item en wishlist
    await Wishlist.create({
      userId,
      gameId,
      addedAt: new Date()
    });

    // Incrementar el contador de wishlist y views del juego
    await Game.increment(['wishlistCount', 'views'], { where: { id: gameId } });

    res.status(201).json({ message: 'Juego agregado a la lista de deseos exitosamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al agregar el juego a la lista de deseos', error: error.message });
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
    const userId = req.user.userId;
    const { cardNumber, cardHolderName, cardExpirationDate, cardSecurityCode } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.update({
      cardNumber,
      cardHolderName,
      cardExpirationDate,
      cardSecurityCode
    });

    res.json({ 
      message: 'Método de pago actualizado exitosamente',
      paymentMethod: {
        cardNumber,
        cardHolderName,
        cardExpirationDate
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Error al actualizar el método de pago', 
      error: error.message 
    });
  }
};

const addToCartFromWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { gameId } = req.params;

    // Verificar si el juego está en la wishlist
    const wishlistItem = await Wishlist.findOne({
      where: { userId, gameId }
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Juego no encontrado en la lista de deseos' });
    }

    // Obtener el juego y su precio
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    // Agregar al carrito
    const [cartItem, created] = await Cart.findOrCreate({
      where: { userId, gameId },
      defaults: { 
        quantity: 1, 
        subtotal: Number(game.price.toFixed(2))
      }
    });

    if (!created) {
      const newQuantity = cartItem.quantity + 1;
      const newSubtotal = Number((game.price * newQuantity).toFixed(2));
      await cartItem.update({ 
        quantity: newQuantity,
        subtotal: newSubtotal
      });
    }

    // Eliminar de la wishlist
    await wishlistItem.destroy();

    res.json({ message: 'Juego agregado al carrito exitosamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Error al agregar el juego al carrito desde la wishlist', 
      error: error.message 
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { currentPassword, newPassword } = req.body;

    // Validar que se proporcionaron ambas contraseñas
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        message: 'Se requieren tanto la contraseña actual como la nueva' 
      });
    }

    // Validar la contraseña actual
    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    // Validar que la nueva contraseña sea diferente
    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({ 
        message: 'La nueva contraseña debe ser diferente a la actual' 
      });
    }

    // Validar requisitos de la nueva contraseña
    if (newPassword.length < 8) {
      return res.status(400).json({ 
        message: 'La nueva contraseña debe tener al menos 8 caracteres' 
      });
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

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.userId;

        const wishlistItems = await Wishlist.findAll({
            where: { userId },
            include: [{
                model: Game,
                attributes: [
                    'id',
                    'name',
                    'price',
                    'imageType'
                ]
            }],
            order: [['addedAt', 'DESC']]
        });

        const formattedWishlist = wishlistItems.map(item => ({
            id: item.Game.id,
            name: item.Game.name,
            price: item.Game.price,
            imageUrl: `http://localhost:3000/api/games/${item.Game.id}/image`,
            addedAt: item.addedAt
        }));

        res.json({ wishlist: formattedWishlist });
    } catch (error) {
        console.error('Error al obtener wishlist:', error);
        res.status(500).json({ 
            message: 'Error al obtener la lista de deseos', 
            error: error.message 
        });
    }
};

const getPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findByPk(userId, {
      attributes: ['cardNumber', 'cardHolderName', 'cardExpirationDate']
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      cardNumber: user.cardNumber || '',
      cardHolderName: user.cardHolderName || '',
      cardExpirationDate: user.cardExpirationDate || ''
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener método de pago', 
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
  updatePassword,
  getWishlist,
  getPaymentMethod
};