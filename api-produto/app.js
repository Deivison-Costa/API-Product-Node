const express = require('express');
const conn = require('./db/conn');  
const bodyParser = require('body-parser');
const multer = require('multer');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

// conecta ao mongoDB
conn();

// configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

// instancia o multer
const upload = multer({ storage: storage });

// rotas
app.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
  res.json({ imageUrl });
});
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

// inicia o servidor
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
