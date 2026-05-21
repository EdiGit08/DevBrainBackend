const { extraerContenido } = require('../services/extractor.service');

async function crearArticulo(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Debes enviar una URL' });
  }

  try {
    const resultado = await extraerContenido(url);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({
      error: 'No se pudo procesar la URL',
      detalle: error.message
    });
  }
}

module.exports = { crearArticulo };