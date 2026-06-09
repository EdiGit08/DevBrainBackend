const express = require('express');
const router = express.Router();
const { 
  crearArticulo, 
  obtenerArticulos, 
  obtenerArticuloById,
  eliminarArticulo
} = require('../controllers/articles.controller');

router.post('/', crearArticulo);

router.get('/', obtenerArticulos);

router.get('/:id', obtenerArticuloById);

router.delete('/:id', eliminarArticulo);

module.exports = router;