const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, cartController.getCart);
router.post('/', authenticateToken, cartController.addToCart);
router.put('/', authenticateToken, cartController.updateCartItem);
router.delete('/:gameId', authenticateToken, cartController.removeFromCart);

module.exports = router;
