const express = require('express');
const multer = require('multer');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Pasta onde as imagens serão armazenadas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo após o upload
  }
});

// instancia o multer
const upload = multer({ storage: storage });


// centraliza as rotas para produtos
router.get('/', authMiddleware.authenticateToken, productController.getAllProducts);
router.post('/', authMiddleware.authenticateToken, productController.createProduct);
router.put('/:id', authMiddleware.authenticateToken, productController.updateProduct);
router.delete('/:id', authMiddleware.authenticateToken, productController.deleteProduct);
router.post('/upload', upload.single('image'), productController.uploadImage);

module.exports = router;