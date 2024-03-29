const express = require('express');
const conn = require('./db/conn');  
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

// conecta no mongoDB
conn();

// Rotas
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

// inicia o servidor
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
