const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

const {
    getUserProfile,
    getBusinessProfile,
    updateUserProfile,
    addToWishlist,
    removeFromWishlist,
    updatePaymentMethod,
    addToCartFromWishlist
} = require('../controllers/userController');

router.get('/profile', authenticateToken, getUserProfile);
router.get('/profile/business', authenticateToken, getBusinessProfile);
router.put('/profile/:userId', authenticateToken, updateUserProfile);
router.post('/wishlist/:userId', authenticateToken, addToWishlist);
router.delete('/wishlist/:userId/:gameId', authenticateToken, removeFromWishlist);
router.put('/payment-method/:userId', authenticateToken, updatePaymentMethod);
router.post('/cart/from-wishlist/:userId/:gameId', authenticateToken, addToCartFromWishlist);
module.exports = router;