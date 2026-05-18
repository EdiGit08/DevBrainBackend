const express = require('express');
const { extraerContenido } = require('./extractor');

const app = express();

app.use(express.json());

app.get('/', (req,res) => { 
    res.json({message: 'API funcionando corretamente'})
});

app.post('/articles', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Debes enviar una URL' });
  }

  try {
    const resultado = await extraerContenido(url);

    res.status(201).json(resultado);

  } catch (error) {
    res.status(500).json({
      error: 'No se pudo procesar la URL',
      detalle: error.message
    });
  }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});


