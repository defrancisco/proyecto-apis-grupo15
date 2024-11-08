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

// Rutas públicas
router.get('/', getAllGames);
router.get('/:gameId/reviews', getGameReviews);

// Rutas que requieren autenticación
router.use(authenticateToken);
router.post('/reviews', createReview);
router.put('/reviews/:reviewId', updateReview);
router.delete('/reviews/:reviewId', deleteReview);

module.exports = router; 