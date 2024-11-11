const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getAllGames,
  createReview,
  getGameReviews,
  updateReview,
  deleteReview,
  getGameById,
  incrementGameViews
} = require('../controllers/gameController');
const Game = require('../models/game');


router.get('/', getAllGames);
router.get('/:gameId', getGameById);
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
router.post('/:gameId/views', incrementGameViews);
router.use(authenticateToken);
router.post('/review', createReview);
router.put('/reviews/:reviewId', updateReview);
router.delete('/reviews/:reviewId', deleteReview);




module.exports = router; 