const express = require('express');
const multer = require('multer');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../configs/configUpload');

// centraliza as rotas para produtos
router.get('/', authMiddleware.authenticateToken, productController.getAllProducts);
router.post('/', authMiddleware.authenticateToken, productController.createProduct);
router.put('/:id', authMiddleware.authenticateToken, productController.updateProduct);
router.delete('/:id', authMiddleware.authenticateToken, productController.deleteProduct);
router.post('/upload', upload.single('image'), productController.uploadImage);

module.exports = router;
