const express = require('express');
const router = express.Router();

// Ruta para obtener la URL de Twitter
router.get('/twitter', (req, res) => {
  res.status(200).json({ twitterURL: "https://twitter.com/NintendoES" });
});

// Ruta para obtener la URL de Instagram
router.get('/instagram', (req, res) => {
  res.status(200).json({ instagramURL: "https://www.instagram.com/nintendoes/" });
});

// Ruta para obtener la URL de YouTube
router.get('/youtube', (req, res) => {
  res.status(200).json({ youtubeURL: "https://www.youtube.com/user/Nintendo" });
});

module.exports = router;
