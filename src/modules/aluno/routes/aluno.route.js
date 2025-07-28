const express = require('express');
const AlunoController = require('../../aluno/controller/aluno.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');

const router = express.Router();

// rota para listar alunos
router.get('/alunos', AutenticacaoMiddleware.autenticarToken, AlunoController.listar);
// rota para listar aluno por ID
router.get('/alunos/:id', AutenticacaoMiddleware.autenticarToken, AlunoController.listarPorId);
// rota para cadastrar aluno
router.post('/alunos', AutenticacaoMiddleware.autenticarToken, AlunoController.cadastrar);
// rota para atualizar aluno
router.put('/alunos/:id', AutenticacaoMiddleware.autenticarToken, AlunoController.editar);
// rota para excluir aluno
router.delete('/alunos/:id', AutenticacaoMiddleware.autenticarToken, AlunoController.excluirPorId);

module.exports = router;