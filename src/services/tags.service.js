const pool = require('../database/db')

async function crearEtiqueta(nombre) {
    const query = `
        INSERT INTO tags (nombre)
        VALUES ($1)
        RETURNING *
    `
    const resultado = await pool.query(query, [nombre])
    return resultado.rows[0]
}

async function listarEtiquetas() {
    const query = `SELECT * FROM tags ORDER BY nombre`
    const resultado = await pool.query(query)
    return resultado.rows
}

async function filtrarEtiquetasPorArticulo(articuloId) {
    const query = `
        SELECT t.*
        FROM tags t
        JOIN articulo_tags at ON t.id = at.tag_id
        WHERE at.articulo_id = $1
    `
    const resultado = await pool.query(query, [articuloId])
    return resultado.rows
}

async function eliminarEtiqueta(id) {
    const query = `DELETE FROM tags WHERE id = $1 RETURNING *`
    const resultado = await pool.query(query, [id])
    return resultado.rows[0]
}

module.exports = {
    crearEtiqueta,
    listarEtiquetas,
    filtrarEtiquetasPorArticulo,
    eliminarEtiqueta
}