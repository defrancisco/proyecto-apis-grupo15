const express = require('express');
const app = express();

// Ruta para obtener la URL de Twitter
app.get('/social/twitter', (req, res) => {
  res.status(200).json({
    twitterURL: "https://twitter.com/NintendoES"
  });
});

// Ruta para obtener la URL de Instagram
app.get('/social/instagram', (req, res) => {
  res.status(200).json({
    instagramURL: "https://www.instagram.com/nintendoes/"
  });
});

// Ruta para obtener la URL de YouTube
app.get('/social/youtube', (req, res) => {
  res.status(200).json({
    youtubeURL: "https://www.youtube.com/user/Nintendo"
  });
});

// Puerto donde se escucha el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
