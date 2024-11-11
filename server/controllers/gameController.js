const Review = require('../models/review');
const Game = require('../models/game');
const User = require('../models/user');
const { Op } = require('sequelize');

// Obtener todos los juegos
const getAllGames = async (req, res) => {
  try {
    const { 
      category, 
      minPrice, 
      maxPrice, 
      sortBy = 'name',
      order = 'ASC',
      search,
      operatingSystem
    } = req.query;

    let whereClause = { isPublished: true };
    
    // Filtro por categoría
    if (category) {
      whereClause = {
        ...whereClause,
        categories: {
          [Op.like]: `%${category}%`
        }
      };
    }

    // Filtro por precio
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = minPrice;
      if (maxPrice) whereClause.price[Op.lte] = maxPrice;
    }

    // Filtro por sistema operativo
    if (operatingSystem) {
      const osArray = Array.isArray(operatingSystem) 
        ? operatingSystem 
        : operatingSystem.split(',');

      whereClause.operatingSystem = {
        [Op.or]: osArray.map(os => ({ [Op.like]: `%${os}%` }))
      };
    }

    // Búsqueda por nombre
    if (search) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const games = await Game.findAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'developer',
        attributes: ['businessName']
      }, {
        model: Review,
        attributes: ['rating'],
        required: false
      }],
      attributes: [
        'id', 'name', 'description', 'price', 'categories',
        'operatingSystem', 'languages', 'players',
        'averageRating', 'imageData', 'imageType',
        'minRequirements', 'recommendedRequirements',
        'createdAt', 'updatedAt'
      ],
      order: [[sortBy, order]]
    });

    const formattedGames = games.map(game => ({
      ...game.toJSON(),
      imageData: undefined, 
      hasImage: !!game.imageData
    }));

    res.json(formattedGames);
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
      }],
      order: [['createdAt', 'DESC']],
      attributes: [
        'id', 'rating', 'content', 'createdAt',
        'updatedAt'
      ]
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
    
    // Recalcular promedio
    const gameReviews = await Review.findAll({
      where: { gameId: review.gameId }
    });
    
    const averageRating = gameReviews.reduce((acc, rev) => acc + rev.rating, 0) / gameReviews.length;
    await Game.update(
      { averageRating }, 
      { where: { id: review.gameId } }
    );

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

    const review = await Review.findOne({
      where: { id: reviewId, userId }
    });

    if (!review) {
      return res.status(404).json({
        message: 'Reseña no encontrada o no tienes permiso para eliminarla'
      });
    }

    const gameId = review.gameId;
    await review.destroy();

    // Recalcular promedio después de eliminar
    const remainingReviews = await Review.findAll({
      where: { gameId }
    });

    const averageRating = remainingReviews.length > 0 
      ? remainingReviews.reduce((acc, rev) => acc + rev.rating, 0) / remainingReviews.length
      : 0;

    await Game.update({ averageRating }, { where: { id: gameId } });

    res.json({ message: 'Reseña eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error eliminando reseña', 
      error: error.message 
    });
  }
};

const getGameById = async (req, res) => {
    try {
        const { gameId } = req.params;
        const game = await Game.findOne({
            where: { id: gameId },
            include: [{
                model: User,
                as: 'developer',
                attributes: ['businessName']
            }],
            attributes: [
                'id', 'name', 'description', 'price', 'categories',
                'operatingSystem', 'languages', 'players',
                'averageRating', 'imageType',
                'minRequirements', 'recommendedRequirements',
                'createdAt', 'updatedAt'
            ]
        });

        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        const gameResponse = {
            ...game.toJSON(),
            imageData: undefined
        };

        res.json(gameResponse);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error obteniendo detalles del juego', 
            error: error.message 
        });
    }
};

const incrementGameViews = async (req, res) => {
  try {
    const { gameId } = req.params;
    await Game.increment('views', { where: { id: gameId } });
    res.json({ message: 'Views incremented successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error incrementando vistas', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllGames,
  createReview,
  getGameReviews,
  updateReview,
  deleteReview,
  getGameById,
  incrementGameViews
};
