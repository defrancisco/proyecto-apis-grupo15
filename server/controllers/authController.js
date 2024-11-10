const User = require('../models/user'); // Importar el modelo de usuario
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Para generar el token de autenticación

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  const { email, password, userType, name, surname } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear el nuevo usuario
    const newUser = await User.create({ email, password, userType, name, surname });
    return res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crear un token JWT
    const token = jwt.sign({ userId: user.id, userType: user.userType }, 'your-secret-key', { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        email: user.email,
        userType: user.userType,
        name: user.name,
        surname: user.surname,
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Recuperar contraseña
exports.recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar un código de recuperación (simulación)
    const recoveryCode = '123456'; // Esto es solo un ejemplo, en un caso real generarías un código dinámico
    // Aquí deberías enviar el código al correo del usuario (por ejemplo, con nodemailer)
    
    return res.status(200).json({ message: 'Email de recuperación enviado', recoveryCode });
  } catch (error) {
    console.error('Error al recuperar contraseña:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Verificar código de recuperación
exports.verifyRecoveryCode = async (req, res) => {
  const { email, recoveryCode } = req.body;

  // Simulación de verificación de código
  if (recoveryCode === '123456') {
    return res.status(200).json({ message: 'Código de verificación correcto' });
  } else {
    return res.status(400).json({ message: 'Código de verificación incorrecto' });
  }
};
