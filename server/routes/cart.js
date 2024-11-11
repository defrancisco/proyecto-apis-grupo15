const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, cartController.getCart);
router.post('/add', authenticateToken, cartController.addToCart);
router.put('/update', authenticateToken, cartController.updateCartItem);
router.delete('/:gameId', authenticateToken, cartController.removeFromCart);
router.post('/checkout', authenticateToken, cartController.processCheckout);

module.exports = router;
