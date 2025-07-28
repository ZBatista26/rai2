const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');

const Aluno = sequelize.define(
   "Aluno",
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false, 
      },
   
      nome: {
         type: DataTypes.STRING(60),
         allowNull: false,
      },

      turma: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      tableName: "aluno",
      createdAt: "criando_em",
      updatedAt: "atualizado_em"
   }
);

module.exports = Aluno;