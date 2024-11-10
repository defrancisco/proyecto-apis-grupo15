const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta para manejar solicitudes de contacto
app.post('/contact-requests', (req, res) => {
  const { name, email, message } = req.body;

  // Validaciones básicas en el backend
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Aquí podrías guardar la solicitud en una base de datos o enviarla por correo
  console.log('Solicitud de contacto recibida:', { name, email, message });

  // Simulamos éxito
  res.status(201).json({ message: 'Solicitud de contacto enviada con éxito' });
});

// Puerto donde escucha el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
