const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Permitir CORS para todas las solicitudes
app.use(cors()); // Esto habilita CORS para cualquier origen

// Utilizar el puerto asignado por Render o 3000 si está en desarrollo
const PORT = process.env.PORT || 3000;

// Ruta para desencriptar el hash con la API de md5decrypt.net
app.get('/api/decrypt/:hash', async (req, res) => {
  const { hash } = req.params;
  const apiKey = '2b679839daa46a2d'; // Tu clave API
  const apiUrl = `https://api.md5decrypt.net/decrypt/sha256/${hash}?apikey=${apiKey}`;

  try {
    // Realizamos la solicitud a la API externa
    const response = await axios.get(apiUrl);
    // Enviar la respuesta de la API de vuelta al cliente
    res.json(response.data);
  } catch (error) {
    console.error('Error al contactar la API:', error.message);
    // Enviar un error al cliente si algo falla
    res.status(500).json({ error: 'Error al contactar la API' });
  }
});

// Arrancar el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`Proxy escuchando en el puerto ${PORT}`);
});
