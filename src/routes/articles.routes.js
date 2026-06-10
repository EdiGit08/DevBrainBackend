const express = require('express');
const router = express.Router();
const { 
  crearArticulo, 
  obtenerArticulos, 
  obtenerArticuloById,
  eliminarArticulo,
  asignarTag
} = require('../controllers/articles.controller');

router.post('/', crearArticulo);

router.get('/', obtenerArticulos);

router.get('/:id', obtenerArticuloById);

router.delete('/:id', eliminarArticulo);

router.patch('/:id/tag', asignarTag);

module.exports = router;