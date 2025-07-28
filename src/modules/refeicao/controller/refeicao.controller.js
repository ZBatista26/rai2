const RefeicaoModel = require('../models/refeicao.model');

class RefeicaoController {
    static async criar(req, res) {
        try {
            const {
                alunoId,
                turma,
                data_refeicao,
                cardapio,
                responsavel_nome
            } = req.body;

            if (!alunoId || !turma || !data_refeicao || !cardapio || !responsavel_nome) {
                return res.status(401).json({
                    msg: "Todos os dados devem ser preenchidos!"
                })
            };

            await RefeicaoModel.create({
                alunoId,
                turma,
                data_refeicao,
                cardapio,
                responsavel_nome
            });
            res.status(200).json({ msg: "Refeicao criada com sucesso!" });
        } catch (error) {
            res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message});
        }
    };

    static async listar(req, res) {
        try {
            const refeicoes = await RefeicaoModel.findAll();

            if(refeicoes.length === 0) {
                return res.status(200).json({ msg: "Nenhuma refeiçao cadastrada. Tente novamente!" });
            };

            res.status(200).json(refeicoes);
        } catch (error) {
            res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!'});
        }
    };

    static async listarPorId(req, res) {
        try {
            const alunoId = req.params.alunoId;
            const refeicao = await RefeicaoModel.findByPk(alunoId);

            if(!refeicao) {
                return res.status(401).json({ msg: "Refeiçao nao encontrada. Tente novamente!"})
            };

            res.status(200).json({refeicao});
        } catch (error) {
            res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!'});
        }
    };

    static async editar(req, res) {
        try {
            const alunoId = req.params.alunoId;
            const {
                turma,
                data_refeicao,
                cardapio,
                responsavel_nome
            } = req.body;

            if (!turma || !data_refeicao || !cardapio || !responsavel_nome) {
                return res.status(401).json({ msg: "Pelo menos um dos campos devem ser preenchidos!"})
            };

            const refeicaoAtualizada = await RefeicaoModel.update(
                {   turma: turma,
                    data_refeicao: data_refeicao,
                    cardapio: cardapio,
                    responsavel_nome: responsavel_nome
                },
                { where: { alunoId: alunoId }, returning: true}
            );

            if (!refeicaoAtualizada) {
                return res.status(404).json({ msg: "Nenhum dado atualizado encontrada. Tente novamnte!" })
            };

            res.status(200).json({ refeicaoAtualizada: refeicaoAtualizada });
        } catch (error) {
            res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!'});
        }
    };

    static async deletarPorId(req, res) {
        try {
            const alunoId = req.params.alunoId;
            const refeicaoDeletar = await RefeicaoModel.findByPk(alunoId);

            if (!refeicaoDeletar) {
                return res.status(404).json({ msg: "Refeiçao nao encontrada." })
            };

            await RefeicaoModel.destroy({
                where: { alunoId: alunoId }
            });

            res.status(200).json({ msg: 'Refeiçao excluída com sucesso!' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor, tente mais tarde!' });
        }
    };
};

module.exports = RefeicaoController;