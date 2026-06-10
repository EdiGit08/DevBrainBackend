const pool = require('../database/db');
const axios = require('axios');
const path = require('path');

async function guardarArticulo({ url, titulo, descripcion, imagen }) {
  if (!imagen || typeof imagen !== 'string' || !imagen.startsWith('http')) {
    imagen = 'https://placehold.co/600x400?text=Sin+imagen+%7B+%7D';
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
    SELECT a.*, t.nombre as tag_nombre
    FROM articles a
    LEFT JOIN tags t ON a.tag_id = t.id
    ORDER BY a.creado_en DESC
    LIMIT $1 OFFSET $2
  `;
  const resultado = await pool.query(query, [limite, offset]);
  return resultado.rows;
}

async function buscarArticulos(busqueda, pagina = 1, limite = 10) {
  const offset = (pagina - 1) * limite;
  const query = `
    SELECT a.*, t.nombre as tag_nombre
    FROM articles a
    LEFT JOIN tags t ON a.tag_id = t.id
    WHERE a.titulo ILIKE $1 OR a.descripcion ILIKE $1
    ORDER BY a.creado_en DESC
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

async function asignarEtiqueta(articuloId, tagId) {
  const query = `
    UPDATE articles SET tag_id = $1 WHERE id = $2 RETURNING *
  `;
  const resultado = await pool.query(query, [tagId, articuloId]);
  return resultado.rows[0];
}

module.exports = 
{
    guardarArticulo,
    listarArticulos,
    buscarArticulos,
    borrarArticulo,
    asignarEtiqueta
};