const {crearEtiqueta, listarEtiquetas, eliminarEtiqueta} = require('../services/tags.service')

async function crearTag(req, res) {
    try {
        const { nombre } = req.body;
        const etiqueta = await crearEtiqueta(nombre);
        res.status(201).json(etiqueta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listarTags(req, res) {
    try {
        const etiquetas = await listarEtiquetas();
        res.status(200).json(etiquetas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function eliminarTag(req, res) {
    try {
        const { id } = req.params;
        const etiqueta = await eliminarEtiqueta(id);
        res.status(200).json(etiqueta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    crearTag,
    listarTags,
    eliminarTag
}