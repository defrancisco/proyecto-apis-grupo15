const Cart = require('../models/cart');
const Game = require('../models/game');
const User = require('../models/user');

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{
        model: Game,
        as: 'Game',
        attributes: ['id', 'name', 'price', 'imageType']
      }]
    });

    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.subtotal), 0);
    const tax = Number((subtotal * 0.08).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));

    res.json({
      items: cartItems,
      summary: {
        subtotal: Number(subtotal.toFixed(2)),
        tax,
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { gameId, quantity = 1 } = req.body;
    const userId = req.user.userId;

    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const subtotal = Number((game.price * quantity).toFixed(2));

    const [cartItem, created] = await Cart.findOrCreate({
      where: { userId, gameId },
      defaults: { quantity, subtotal }
    });

    if (!created) {
      const newQuantity = cartItem.quantity + quantity;
      const newSubtotal = Number((game.price * newQuantity).toFixed(2));
      await cartItem.update({ 
        quantity: newQuantity,
        subtotal: newSubtotal
      });
    }

    res.json({ message: 'Game added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding game to cart', error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { gameId, quantity } = req.body;
    const userId = req.user.userId;

    const cartItem = await Cart.findOne({
      where: { userId, gameId },
      include: [{ model: Game }]
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      await cartItem.destroy();
      return res.json({ message: 'Item removed from cart' });
    }

    const subtotal = Number((cartItem.Game.price * quantity).toFixed(2));
    await cartItem.update({ quantity, subtotal });

    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { gameId } = req.params;
    const userId = req.user.userId;

    const deleted = await Cart.destroy({
      where: { userId, gameId }
    });

    if (deleted) {
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
};

const processCheckout = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Obtener todos los items del carrito con el alias correcto
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{
        model: Game,
        as: 'Game'  // Especificamos el alias que definimos en el modelo
      }]
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ 
        message: 'El carrito está vacío' 
      });
    }

    // Incrementar purchases para cada juego
    for (const item of cartItems) {
      await Game.increment('purchases', { 
        where: { id: item.Game.id }  // Usamos item.Game.id
      });
    }

    // Vaciar el carrito
    await Cart.destroy({
      where: { userId }
    });

    res.json({ 
      message: 'Compra realizada exitosamente',
      purchasedItems: cartItems.length
    });

  } catch (error) {
    console.error('Error en checkout:', error);
    res.status(500).json({ 
      message: 'Error al procesar la compra', 
      error: error.message 
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  processCheckout
};
