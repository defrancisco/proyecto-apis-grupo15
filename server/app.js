const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para manejar JSON en las solicitudes


app.get('/', (req, res) => {
  res.send('Backend');
});



app.listen(port, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});