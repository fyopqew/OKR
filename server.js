require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const autoRoutes = require('./src/routes/autoRoutes');

const app = express();
const port = process.env.PORT || 2391;

app.use(bodyParser.json());

app.use('/auto', autoRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
