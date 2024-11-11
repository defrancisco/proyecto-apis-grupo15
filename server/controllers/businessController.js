const { Game, Review, User } = require('../models');
const { Op } = require('sequelize');

const createGame = async (req, res) => {
  try {
    const developerId = req.user.userId;
    
    const developer = await User.findByPk(developerId);
    if (!developer || developer.userType !== 'business') {
      return res.status(403).json({ 
        message: 'Only business accounts can create games' 
      });
    }

    const {
      name,
      description,
      operatingSystem,
      players,
      minRequirements,
      recommendedRequirements
    } = req.body;

    const price = Number(req.body.price);
    if (isNaN(price)) {
      return res.status(400).json({ 
        message: 'Price must be a valid number' 
      });
    }

    const categories = JSON.parse(req.body.categories);
    const languages = JSON.parse(req.body.languages);

    let imageData = null;
    let imageType = null;
    
    if (req.file) {
      imageData = req.file.buffer;
      imageType = req.file.mimetype;
    }

    const game = await Game.create({
      name,
      categories,
      price,
      description,
      operatingSystem,
      languages,
      players,
      minRequirements,
      recommendedRequirements,
      developerId,
      imageData,
      imageType
    });

    const gameResponse = {
      ...game.toJSON(),
      imageData: undefined
    };

    res.status(201).json({ 
      message: 'Game created successfully', 
      game: gameResponse 
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

    const game = await Game.findOne({
      where: { 
        id: gameId,
        developerId
      }
    });

    if (!game) {
      return res.status(404).json({ 
        message: 'Juego no encontrado o no tienes permisos para modificarlo' 
      });
    }

    // Actualizar la imagen si se proporciona una nueva
    if (req.file) {
      await game.update({
        imageData: req.file.buffer,
        imageType: req.file.mimetype
      });
    }

    // Actualizar los demás campos
    await game.update({
      name: req.body.name,
      categories: req.body.category,
      price: req.body.price,
      description: req.body.description,
      operatingSystem: req.body.operatingSystem,
      languages: req.body.language,
      minRequirements: req.body.minRequirements,
      recommendedRequirements: req.body.recommendedRequirements
    });

    res.json({ 
      message: 'Juego actualizado exitosamente',
      hasImage: !!game.imageData
    });
  } catch (error) {
    console.error('Error en updateGame:', error);
    res.status(500).json({ 
      message: 'Error al actualizar el juego', 
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
      where: { 
        developerId,
        isPublished: true 
      },
      attributes: [
        'id', 
        'name', 
        'views', 
        'purchases', 
        'wishlistCount',
        'createdAt'
      ],
      order: [['createdAt', 'DESC']]
    });

    if (!games.length) {
      return res.status(404).json({ 
        message: 'No se encontraron juegos para este desarrollador' 
      });
    }

    res.json(games);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error obteniendo analytics de juegos', 
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

const getBusinessGames = async (req, res) => {
  try {
    const developerId = req.user.userId;

    const games = await Game.findAll({
      where: { developerId },
      attributes: [
        'id', 
        'name',
        'price',
        'isPublished',
        'imageType',
        'imageData',
        'operatingSystem',
        'createdAt',
        'updatedAt'
      ],
      order: [['createdAt', 'DESC']]
    });
    
    const formattedGames = games.map(game => ({
      ...game.toJSON(),
      imageData: undefined,
      hasImage: !!game.imageData
    }));

    res.json(formattedGames);
  } catch (error) {
    console.error('Error en getBusinessGames:', error);
    res.status(500).json({ 
      message: 'Error obteniendo juegos de la empresa', 
      error: error.message 
    });
  }
};

const getGameById = async (req, res) => {
  try {
    const { gameId } = req.params;
    const developerId = req.user.userId;

    const game = await Game.findOne({
      where: { 
        id: gameId,
        developerId 
      },
      attributes: [
        'id',
        'name',
        'categories',
        'price',
        'languages',
        'description',
        'minRequirements',
        'recommendedRequirements',
        'operatingSystem',
        'imageType',
        'imageData',
        'isPublished'
      ]
    });

    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }

    res.json({
      id: game.id,
      name: game.name,
      categories: game.categories,
      price: game.price,
      languages: game.languages,
      description: game.description,
      minRequirements: game.minRequirements,
      recommendedRequirements: game.recommendedRequirements,
      operatingSystem: game.operatingSystem,
      isPublished: game.isPublished
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error obteniendo detalles del juego', 
      error: error.message 
    });
  }
};

module.exports = {
  createGame,
  updateGame,
  deleteGame,
  getGameAnalytics,
  unpublishGame,
  publishGame,
  getBusinessGames,
  getGameById
};
