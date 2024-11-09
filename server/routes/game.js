const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getAllGames,
  createReview,
  getGameReviews,
  updateReview,
  deleteReview
} = require('../controllers/gameController');
const Game = require('../models/game');

// Rutas públicas
router.get('/', getAllGames);
router.get('/:gameId/reviews', getGameReviews);
router.get('/:gameId/image', async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.gameId);
    
    if (!game || !game.imageData) {
      return res.status(404).send('Imagen no encontrada');
    }

    res.set('Content-Type', game.imageType);
    res.send(game.imageData);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error obteniendo imagen', 
      error: error.message 
    });
  }
});

// Rutas que requieren autenticación
router.use(authenticateToken);
router.post('/reviews', createReview);
router.put('/reviews/:reviewId', updateReview);
router.delete('/reviews/:reviewId', deleteReview);

module.exports = router; 