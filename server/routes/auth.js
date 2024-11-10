const express = require('express');
const router = express.Router();

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
router.post('/change-password', changePassword);

module.exports = router;