const express = require('express');
const articlesRoutes = require('./src/routes/articles.routes');

const app = express();
app.use(express.json());

app.use('/articles', articlesRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});