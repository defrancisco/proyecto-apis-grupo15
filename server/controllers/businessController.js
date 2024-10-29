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
      developerId
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
      recommendedRequirements
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
    const { gameId } = req.params;
    const userId = req.user.userId;

    const game = await Game.findOne({
      where: { 
        id: gameId,
        developerId: userId
      },
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

    if (!game) {
      return res.status(404).json({ 
        message: 'Game not found or you do not have permission to view analytics' 
      });
    }

    res.json(game);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error getting game analytics', 
      error: error.message 
    });
  }
};

module.exports = {
  createGame,
  updateGame,
  deleteGame,
  getGameAnalytics
};
