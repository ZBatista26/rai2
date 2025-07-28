const express = require('express');
const router = express.Router();

const AuthController = require('../controller/autenticacao.controller');

// rota publica para fazer o login
router.post('/login', AuthController.login);
// rota para sair
router.post('/logout', AuthController.sair);
// rota para atualizar o token
router.post('/refress-token', AuthController.refreshToken);

module.exports = router;