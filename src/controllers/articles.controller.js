const { extraerContenido } = require('../services/extractor.service');
const { guardarArticulo, listarArticulos, buscarArticulos } = require('../services/articles.service');
const pool = require('../database/db');

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

async function obtenerArticulos(req, res) {
  try {
    const { search, pagina = 1, limite = 10 } = req.query;

    let articulos;
    
    if (search) {
      articulos = await buscarArticulos(search, pagina, limite);
    } else {
      articulos = await listarArticulos(pagina, limite);
    }

    res.json({
      total: articulos.length,
      pagina: parseInt(pagina),
      articulos
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerArticuloById(req, res) {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM articles WHERE id = $1`;
    const resultado = await pool.query(query, [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = 
{ 
  crearArticulo, 
  obtenerArticulos, 
  obtenerArticuloById 
};