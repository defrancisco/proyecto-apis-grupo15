const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

const isBusinessUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user || user.userType !== 'business') {
      return res.status(403).json({ message: 'Business account required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error verifying user type' });
  }
};

module.exports = {
  authenticateToken,
  isBusinessUser
}; 