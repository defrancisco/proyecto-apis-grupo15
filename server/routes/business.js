const express = require('express');
const router = express.Router();
const { authenticateToken, isBusinessUser } = require('../middleware/auth');
const upload = require('../middleware/upload');

const {
  createGame,
  updateGame,
  deleteGame,
  getGameAnalytics,
  unpublishGame,
  publishGame,
  getBusinessGames,
  getGameById
} = require('../controllers/businessController');

// Todas las rutas requieren autenticación y ser usuario empresa
router.use(authenticateToken);
router.use(isBusinessUser);

// Rutas para gestión de juegos
router.get('/games', getBusinessGames);
router.post('/games', upload.single('imagen'), createGame);
router.put('/games/:gameId', 
  authenticateToken, 
  isBusinessUser,
  upload.single('imagen'),
  updateGame
);
router.delete('/games/:gameId', deleteGame);
router.get('/games/analytics', getGameAnalytics);
router.put('/games/:gameId/unpublish', unpublishGame);
router.put('/games/:gameId/publish', publishGame);
router.get('/games/:gameId', authenticateToken, getGameById);

module.exports = router;
