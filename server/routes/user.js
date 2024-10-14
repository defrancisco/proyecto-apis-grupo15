const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth')

const{
    getUserProfile,
    getBusinessProfile,
    updateUserProfile,
    addToWishlist,
} = require('../controllers/userController');

router.get('/profile/individual', authenticateToken, getUserProfile);
router.get('/profile/business', authenticateToken, getBusinessProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.post('/wishlist', authenticateToken, addToWishlist);


module.exports = router;