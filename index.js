const express = require('express');
const cors = require('cors');
const articlesRoutes = require('./src/routes/articles.routes');
const tagsRoutes = require('./src/routes/tags.routes');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/articles', articlesRoutes);

app.use('/tags', tagsRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});