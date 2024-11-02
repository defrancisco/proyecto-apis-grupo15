const { Game, Review, User } = require('../models');
const { Op } = require('sequelize');

const createGame = async (req, res) => {
  try {
    const developerId = req.user.userId;
    
    // Verificar que el usuario sea de tipo business
    const developer = await User.findByPk(developerId);
    if (!developer || developer.userType !== 'business') {
      return res.status(403).json({ 
        message: 'Only business accounts can create games' 
      });
    }

    const {
      name,
      category,
      price,
      description,
      operatingSystem,
      language,
      players,
      rating,
      minRequirements,
      recommendedRequirements
    } = req.body;

    const imagePath = req.file ? req.file.path : null; // Obtener la ruta de la imagen

    const game = await Game.create({
      name,
      category,
      price,
      description,
      operatingSystem,
      language,
      players,
      rating,
      minRequirements,
      recommendedRequirements,
      developerId,
      imagePath // Guardar la ruta de la imagen en la base de datos
    });

    res.status(201).json({ 
      message: 'Game created successfully', 
      game 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating game', 
      error: error.message 
    });
  }
};

const updateGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const developerId = req.user.userId;
    const {
      name,
      category,
      price,
      description,
      operatingSystem,
      language,
      players,
      rating,
      minRequirements,
      recommendedRequirements
    } = req.body;

    const game = await Game.findOne({
      where: { 
        id: gameId,
        developerId
      }
    });

    if (!game) {
      return res.status(404).json({ 
        message: 'Game not found or you do not have permission to modify it' 
      });
    }

    const imagePath = req.file ? req.file.path : game.imagePath; // Usar la nueva imagen si se proporciona

    await game.update({
      name,
      category,
      price,
      description,
      operatingSystem,
      language,
      players,
      rating,
      minRequirements,
      recommendedRequirements,
      imagePath // Actualizar la ruta de la imagen
    });

    res.json({ 
      message: 'Game updated successfully', 
      game 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating game', 
      error: error.message 
    });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const developerId = req.user.userId;

    const game = await Game.findOne({
      where: { 
        id: gameId,
        developerId
      }
    });

    if (!game) {
      return res.status(404).json({ 
        message: 'Game not found or you do not have permission to delete it' 
      });
    }

    await game.destroy();

    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting game', 
      error: error.message 
    });
  }
};

const getGameAnalytics = async (req, res) => {
  try {
    const developerId = req.user.userId;

    const games = await Game.findAll({
      where: { developerId },
      include: [{
        model: Review,
        as: 'reviews',
        attributes: ['rating', 'content', 'createdAt']
      }],
      attributes: [
        'id', 'name', 'views', 'purchases', 
        'wishlistCount', 'averageRating'
      ]
    });

    if (!games.length) {
      return res.status(404).json({ 
        message: 'No games found for this developer' 
      });
    }

    res.json(games);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error getting game analytics', 
      error: error.message 
    });
  }
};

const unpublishGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const developerId = req.user.userId;

    const game = await Game.findOne({ where: { id: gameId, developerId } });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    game.isPublished = false; // Cambia el estado de publicación
    await game.save();

    res.json({ message: 'Game unpublished successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unpublishing game', error: error.message });
  }
};

const publishGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const developerId = req.user.userId;

    const game = await Game.findOne({ where: { id: gameId, developerId } });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    game.isPublished = true; // Cambia el estado de publicación a true
    await game.save();

    res.json({ message: 'Game published successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error publishing game', error: error.message });
  }
};

module.exports = {
  createGame,
  updateGame,
  deleteGame,
  getGameAnalytics,
  unpublishGame,
  publishGame
};
