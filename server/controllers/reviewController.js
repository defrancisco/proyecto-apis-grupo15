const Review = require('../models/review');
const Game = require('../models/game');
const User = require('../models/user');

const createReview = async (req, res) => {
  try {
    const { gameId, rating, content } = req.body;
    const userId = req.user.userId;

    // Verificar si el usuario ya ha reseñado este juego
    const existingReview = await Review.findOne({
      where: { userId, gameId }
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this game' });
    }

    const review = await Review.create({
      userId,
      gameId,
      rating,
      content
    });

    // Actualizar rating promedio del juego
    const gameReviews = await Review.findAll({
      where: { gameId }
    });

    const averageRating = gameReviews.reduce((acc, rev) => acc + rev.rating, 0) / gameReviews.length;
    await Game.update({ averageRating }, { where: { id: gameId } });

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

const getGameReviews = async (req, res) => {
  try {
    const { gameId } = req.params;
    const reviews = await Review.findAll({
      where: { gameId },
      include: [{
        model: User,
        attributes: ['name', 'businessName']
      }]
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching reviews', 
      error: error.message 
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, content } = req.body;
    const userId = req.user.userId;

    const review = await Review.findOne({
      where: { id: reviewId, userId }
    });

    if (!review) {
      return res.status(404).json({ 
        message: 'Review not found or you do not have permission to modify it' 
      });
    }

    await review.update({ rating, content });
    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating review', 
      error: error.message 
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.userId;

    const deleted = await Review.destroy({
      where: { id: reviewId, userId }
    });

    if (deleted) {
      res.json({ message: 'Review deleted successfully' });
    } else {
      res.status(404).json({ 
        message: 'Review not found or you do not have permission to delete it' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting review', 
      error: error.message 
    });
  }
};

module.exports = {
  createReview,
  getGameReviews,
  updateReview,
  deleteReview
};
