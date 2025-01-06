const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

app.get('/api/decrypt/:hash', async (req, res) => {
  const { hash } = req.params;
  const apiKey = '2b679839daa46a2d'; // Reemplaza con tu clave API
  const apiUrl = `https://md5decrypt.net/Api/api.php?hash=${hash}&hash_type=sha256&code=${apiKey}`;

  try {
    // Llamar a la API con axios
    const response = await axios.get(apiUrl);
    const decrypted = response.data;

    if (decrypted.trim() === 'NO_DATA') {
      res.status(404).json({ error: 'El hash no pudo ser descifrado.' });
    } else {
      res.json({ email: decrypted.trim() });
    }
  } catch (error) {
    console.error('Error al contactar la API:', error.message);
    res.status(500).json({ error: 'Error al contactar la API.' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy escuchando en el puerto ${PORT}`);
});

