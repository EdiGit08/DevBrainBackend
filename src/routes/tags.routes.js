const express = require('express');
const router = express.Router();
const { crearTag, listarTags, eliminarTag } = require('../controllers/tags.controller');

router.post('/', crearTag);

router.get('/', listarTags);

router.delete('/:id', eliminarTag);

module.exports = router;