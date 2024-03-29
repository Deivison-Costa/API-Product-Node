const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// centraliza as rotas para autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;