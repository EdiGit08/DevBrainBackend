const { extraerContenido } = require('../services/extractor.service');
const { guardarArticulo } = require('../services/articles.service');

async function crearArticulo(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Debes enviar una URL' });
  }

  try {
    const contenido = await extraerContenido(url);
    const articulo = await guardarArticulo(contenido);

    res.status(201).json(articulo);

  } catch (error) {
    //  error.code === '23505' es el codigo de error que PostgreSQL lanza cuando falla el UNIQUE
    if (error.code === '23505') {
      return res.status(400).json({ error: 'La URL ya está guardada en la BD' });
    }
    res.status(500).json({
      error: 'No se pudo procesar la URL',
      detalle: error.message
    });
  }
}

module.exports = { crearArticulo };