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
    addToCartFromWishlist,
    updatePassword,
    getWishlist,
    getPaymentMethod,
} = require('../controllers/userController');

router.get('/profile', authenticateToken, getUserProfile);
router.get('/profile/business', authenticateToken, getBusinessProfile);
router.post('/wishlist/:gameId', authenticateToken, addToWishlist);
router.delete('/wishlist/:userId/:gameId', authenticateToken, removeFromWishlist);
router.put('/payment-method', authenticateToken, updatePaymentMethod);
router.post('/wishlist/:gameId/to-cart', authenticateToken, addToCartFromWishlist);
router.put('/update-password', authenticateToken, updatePassword);
router.get('/wishlist', authenticateToken, getWishlist);
router.get('/payment-method', authenticateToken, getPaymentMethod);

module.exports = router;