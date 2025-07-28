const express = require('express');
const UsuarioController = require('../controller/usuario.controller');
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware');
const AutenticacaoController = require('../../autenticacao/controller/autenticacao.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');

const router = express.Router();

// rota para cadastrar
router.post('/usuarios', UsuarioController.cadastrar);
// rota para login
router.post('/usuarios/login', AutenticacaoController.login);
// rota para entrar no perfil
router.get('/usuarios/me', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['merendeira', 'admin']), UsuarioController.perfil);

module.exports = router;