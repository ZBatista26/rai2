const express = require('express');
const RefeicaoController = require('../controller/refeicao.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware');

const router = express.Router();

// rota para listar refeicoes
router.get('/refeicoes', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['merendeira']), RefeicaoController.listar);
// rota para listar refeicao por ID
router.get('/refeicao/:alunoId', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['merendeira']), RefeicaoController.listarPorId);
// rota para registrar refeicao
router.post('/refeicoes', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['merendeira']), RefeicaoController.criar);
// rota para editar refeicao por ID
router.put('/refeicoes/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['merendeira']), RefeicaoController.editar);
// rota para excluir refeicao por ID
router.delete('/refeicoes/:alunoId', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['merendeira']), RefeicaoController.deletarPorId);

module.exports = router;