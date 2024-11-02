const express = require('express');
const router = express.Router();
const { authenticateToken, isBusinessUser } = require('../middleware/auth');
const {
  createGame,
  updateGame,
  deleteGame,
  getGameAnalytics,
  unpublishGame,
  publishGame
} = require('../controllers/businessController');

// Todas las rutas requieren autenticación y ser usuario empresa
router.use(authenticateToken);
router.use(isBusinessUser);

// Rutas para gestión de juegos
router.post('/games', createGame);
router.put('/games/:gameId', updateGame);
router.delete('/games/:gameId', deleteGame);
router.get('/games/analytics', getGameAnalytics);
router.put('/games/:gameId/unpublish', unpublishGame);
router.put('/games/:gameId/publish', publishGame);

module.exports = router;
