const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

const {
    getUserProfile,
    getBusinessProfile,
    updateUserProfile,
    addToWishlist,
    removeFromWishlist,
    updatePaymentMethod
} = require('../controllers/userController');

router.get('/profile/individual', authenticateToken, getUserProfile);
router.get('/profile/business', authenticateToken, getBusinessProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.post('/wishlist', authenticateToken, addToWishlist);
router.delete('/wishlist/:gameId', authenticateToken, removeFromWishlist);
router.put('/payment-method', authenticateToken, updatePaymentMethod);

module.exports = router;