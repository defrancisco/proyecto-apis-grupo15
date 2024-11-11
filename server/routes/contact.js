const express = require('express');
const router = express.Router();

// Endpoint para manejar solicitudes de contacto
router.post('/contact-requests', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Aquí podrías guardar el mensaje en la base de datos o enviar un email
    console.log(`Nuevo mensaje de ${name} (${email}): ${message}`);
    res.status(200).json({ message: '¡Mensaje enviado con éxito!' });
  } catch (error) {
    console.error('Error al manejar la solicitud de contacto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
