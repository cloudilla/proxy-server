const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/api/decrypt/:hash', async (req, res) => {
  const { hash } = req.params;
  const apiKey = '2b679839daa46a2d'; // Tu clave API
  const apiUrl = `https://api.md5decrypt.net/decrypt/sha256/${hash}?apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error al contactar la API:', error.message);
    res.status(500).json({ error: 'Error al contactar la API' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy escuchando en el puerto ${PORT}`);
});
