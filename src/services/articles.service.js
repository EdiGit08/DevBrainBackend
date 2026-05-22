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

module.exports = {
    guardarArticulo,
};