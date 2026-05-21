const express = require('express');
const router = express.Router();
const { crearArticulo } = require('../controllers/articles.controller');

router.post('/', crearArticulo);

module.exports = router;