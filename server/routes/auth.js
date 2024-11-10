const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     description: Registra un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               userType:
 *                 type: string
 *                 enum: [individual, business]
 *               name:
 *                 type: string
 *                 example: John
 *               surname:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: El usuario ya existe
 */
router.post('/register', authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     description: Inicia sesión con las credenciales del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', authController.login);

/**
 * @openapi
 * /api/auth/recover-password:
 *   post:
 *     description: Inicia el proceso de recuperación de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email de recuperación enviado
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/recover-password', authController.recoverPassword);

/**
 * @openapi
 * /api/auth/verify-code:
 *   post:
 *     description: Verifica el código de recuperación de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               recoveryCode:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Código de verificación correcto
 *       400:
 *         description: Código de verificación incorrecto
 */
router.post('/verify-code', authController.verifyRecoveryCode);

module.exports = router;
