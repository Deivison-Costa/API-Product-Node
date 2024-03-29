const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../configs/configUpload');

// rota de upload
router.post('/upload', authMiddleware.authenticateToken, upload.single('image'), productController.uploadImage);

// rotas para produtos
router.get('/', authMiddleware.authenticateToken, productController.getAllProducts);
router.post('/', authMiddleware.authenticateToken, productController.createProduct);
router.put('/:id', authMiddleware.authenticateToken, productController.updateProduct);
router.delete('/:id', authMiddleware.authenticateToken, productController.deleteProduct);

module.exports = router;
