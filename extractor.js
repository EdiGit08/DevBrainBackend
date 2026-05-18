const axios = require('axios');
const cheerio = require('cheerio');

async function extraerContenido(url) {
  const respuesta = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0'
    },
    timeout: 8000
  });

  const $ = cheerio.load(respuesta.data);

  const titulo = $('title').text().trim();

  const descripcion =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    'Sin descripción disponible';

  const imagen =
    $('meta[property="og:image"]').attr('content') ||
    null;

  return { titulo, descripcion, imagen, url };
}

module.exports = { extraerContenido };