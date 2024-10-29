const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Authorization header not found' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Token not found' 
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ 
          message: 'Token inválido o expirado' 
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error en la autenticación', 
      error: error.message 
    });
  }
};

const isBusinessUser = (req, res, next) => {
  if (!req.user || req.user.userType !== 'business') {
    return res.status(403).json({ 
      message: 'Acceso denegado. Se requiere cuenta de empresa.' 
    });
  }
  next();
};

const isIndividualUser = (req, res, next) => {
  if (!req.user || req.user.userType !== 'individual') {
    return res.status(403).json({ 
      message: 'Acceso denegado. Se requiere cuenta individual.' 
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  isBusinessUser,
  isIndividualUser
}; 