const Review = require('../models/review');
const Game = require('../models/game');
const User = require('../models/user');

// Obtener todos los juegos
const getAllGames = async (req, res) => {
  try {
    console.log("obteniendo juegos...");
    const games = await Game.findAll({
      where: { isPublished: true },
      include: [{
        model: User,
        as: 'developer',
        attributes: ['businessName']
      }],
      attributes: [
        'id', 'name', 'description', 'price', 'categories',
        'operatingSystem', 'languages', 'players',
        'averageRating', 'imagePath'
      ]
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error obteniendo juegos', 
      error: error.message 
    });
  }
};

// Funciones de reseñas
const createReview = async (req, res) => {
  try {
    const { gameId, rating, content } = req.body;
    const userId = req.user.userId;

    const existingReview = await Review.findOne({
      where: { userId, gameId }
    });

    if (existingReview) {
      return res.status(400).json({ message: 'Ya has reseñado este juego' });
    }

    const review = await Review.create({
      userId,
      gameId,
      rating,
      content
    });

    const gameReviews = await Review.findAll({
      where: { gameId }
    });

    const averageRating = gameReviews.reduce((acc, rev) => acc + rev.rating, 0) / gameReviews.length;
    await Game.update({ averageRating }, { where: { id: gameId } });

    res.status(201).json({ message: 'Reseña creada exitosamente', review });
  } catch (error) {
    res.status(500).json({ message: 'Error creando reseña', error: error.message });
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
      message: 'Error obteniendo reseñas', 
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
        message: 'Reseña no encontrada o no tienes permiso para modificarla' 
      });
    }

    await review.update({ rating, content });
    res.json({ message: 'Reseña actualizada exitosamente', review });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error actualizando reseña', 
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
      res.json({ message: 'Reseña eliminada exitosamente' });
    } else {
      res.status(404).json({ 
        message: 'Reseña no encontrada o no tienes permiso para eliminarla' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error eliminando reseña', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllGames,
  createReview,
  getGameReviews,
  updateReview,
  deleteReview
};
