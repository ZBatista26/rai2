const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');

const Refeicao = sequelize.define(
	"refeicao",
	{
		alunoId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'aluno',
				key: 'id'
			}
		},

		turma: {
			type: DataTypes.STRING,
			allowNull: false
		},

		data_refeicao: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				isDate: {
					msg: 'Data inválida.'
				}

			}
		},

		cardapio: {
			type: DataTypes.STRING,
			allowNull: false
		},
		
		responsavel_nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
	},
	{
		tableName: "refeicao",
		createdAt: "criado_em",
		updatedAt: "atualizado_em",
	}
);

module.exports = Refeicao;