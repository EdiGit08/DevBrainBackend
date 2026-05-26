const express = require('express');
const router = express.Router();
const { 
  crearArticulo, 
  obtenerArticulos, 
  obtenerArticuloById 
} = require('../controllers/articles.controller');

router.post('/', crearArticulo);

router.get('/', obtenerArticulos);

router.get('/:id', obtenerArticuloById);

module.exports = router;