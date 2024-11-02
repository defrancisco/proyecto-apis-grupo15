const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  createReview,
  getGameReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');


router.get('/game/:gameId', getGameReviews);


router.use(authenticateToken);
router.post('/', createReview);
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);

module.exports = router; 