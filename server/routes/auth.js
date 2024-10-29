const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

const {
    register,
    login,
    recoverPassword,
    verifyCode,
    changePassword
} = require('../controllers/authController');

// Rutas publicas
router.post('/register', register);
router.post('/login', login);
router.post('/recover-password', recoverPassword);
router.post('/verify-code', verifyCode);

// Rutas protegidas
router.post('/change-password', authenticateToken, changePassword);

module.exports = router;