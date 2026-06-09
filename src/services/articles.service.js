const pool = require('../database/db');
const axios = require('axios');
const path = require('path');

async function guardarArticulo({ url, titulo, descripcion, imagen }) {
  if (!imagen) {
    imagen = 'https://placehold.co/600x400?text=Sin+imagen{ }'
  }
  
  const query = `
    INSERT INTO articles (url, titulo, descripcion, imagen)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `
  const valores = [url, titulo, descripcion, imagen]
  const resultado = await pool.query(query, valores)
  const articulo = resultado.rows[0]

  try {
    await axios.post('http://localhost:5678/webhook/nuevo-articulo', {
      id:          articulo.id,
      titulo:      articulo.titulo,
      url:         articulo.url,
      creado_en:   articulo.creado_en
    })
  } catch (_) {
    console.log('n8n no disponible — artículo guardado igual')
  }
  return articulo
}

async function listarArticulos(pagina = 1, limite = 10) {
  const offset = (pagina - 1) * limite;
  const query = `
    SELECT * FROM articles 
    ORDER BY creado_en DESC 
    LIMIT $1 OFFSET $2`;
  const resultado = await pool.query(query, [limite, offset]);
  return resultado.rows;
}

async function buscarArticulos(busqueda, pagina = 1, limite = 10) {
  const offset = (pagina - 1) * limite;
  const query = `
    SELECT * FROM articles 
    WHERE titulo ILIKE $1 OR descripcion ILIKE $1
    ORDER BY creado_en DESC
    LIMIT $2 OFFSET $3
  `;
  const busquedaPattern = `%${busqueda}%`;
  const resultado = await pool.query(query, [busquedaPattern, limite, offset]);
  return resultado.rows;
}

async function borrarArticulo(id) {
  const query = `DELETE FROM articles WHERE id = $1 RETURNING *`;
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0];
}

module.exports = 
{
    guardarArticulo,
    listarArticulos,
    buscarArticulos,
    borrarArticulo
};