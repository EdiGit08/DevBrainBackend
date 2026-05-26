const pool = require('../database/db');

async function guardarArticulo({ url, titulo, descripcion, imagen }) {
    const query = `
        INSERT INTO articles (url, titulo, descripcion, imagen) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `;
    const valores = [url, titulo, descripcion, imagen];
    const resultados = await pool.query(query, valores);
    return resultados.rows[0];
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

module.exports = 
{
    guardarArticulo,
    listarArticulos,
    buscarArticulos
};