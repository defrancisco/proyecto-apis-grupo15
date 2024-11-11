const { sendRecoveryEmail } = require('../utils/emailService.js');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RecoveryCode = require('../models/recoveryCode');
const JWT_SECRET = process.env.JWT_SECRET;
const { Op } = require('sequelize');

const register = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let userData = {
      email,
      password,
      userType
    };

    if (userType === 'individual') {
      const { name, surname, dateOfBirth } = req.body;
      Object.assign(userData, {
        name,
        surname,
        dateOfBirth: new Date(dateOfBirth)
      });
    } else if (userType === 'business') {
      const { businessName } = req.body;
      Object.assign(userData, { businessName });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    const newUser = await User.create(userData);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, userType: user.userType });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Buscar códigos existentes
    const existingCodes = await RecoveryCode.findAll({ 
      where: { email },
      order: [['createdAt', 'DESC']]
    });

    // Si hay más de un código, eliminar todos excepto el más reciente
    if (existingCodes.length > 0) {
      const mostRecentCode = existingCodes[0];
      const timeSinceLastCode = Date.now() - mostRecentCode.createdAt.getTime();
      
      // Si el último código tiene menos de 1 minuto
      if (timeSinceLastCode < 60000) { // 60000 ms = 1 minuto
        return res.status(429).json({ 
          message: 'Por favor espere un minuto antes de solicitar un nuevo código' 
        });
      }

      // Eliminar todos los códigos anteriores
      await RecoveryCode.destroy({ where: { email } });
    }

    // Crear nuevo código
    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    
    await RecoveryCode.create({
      email,
      code: recoveryCode,
      expiresAt
    });

    await sendRecoveryEmail(email, recoveryCode);
    res.json({ message: 'Código de recuperación enviado al correo' });
  } catch (error) {
    console.error('Error completo:', error);
    res.status(500).json({ 
      message: 'Error enviando código de recuperación', 
      error: error.message 
    });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const recoveryCode = await RecoveryCode.findOne({
      where: { email, code }
    });

    if (!recoveryCode) {
      return res.status(400).json({ message: 'Código de verificación inválido' });
    }

    // No eliminamos el código aquí, lo mantenemos para el cambio de contraseña
    res.json({ message: 'Code verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verificando código', error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword, code } = req.body;
    
    const recoveryCode = await RecoveryCode.findOne({
      where: { 
        email, 
        code,
        expiresAt: {
          [Op.gt]: new Date() // Verifica que no haya expirado
        }
      }
    });

    if (!recoveryCode) {
      return res.status(400).json({ 
        message: 'Código de verificación inválido o expirado' 
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.password = newPassword;
    await user.save();
    
    // Ahora sí eliminamos el código después de cambiar la contraseña
    await RecoveryCode.destroy({ where: { email } });

    res.json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error cambiando contraseña', 
      error: error.message 
    });
  }
};

module.exports = {
  register,
  login,
  recoverPassword,
  verifyCode,
  changePassword
};