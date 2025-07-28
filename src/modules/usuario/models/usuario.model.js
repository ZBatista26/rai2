const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');

const Usuario = sequelize.define(
   "Usuario",  // antes: "usuario"
   {
      // testar 
      // id: { 
      //    type: DataTypes.INTEGER,
      //    primaryKey: true,
      //    allowNull: false
      // },
      nome: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      papel: {
         type: DataTypes.ENUM('merendeira', 'admin'),
         allowNull: false,
         validate: {
            isIn: {
               args: [['merendeira', 'admin']],
               msg: "O papel deve ser merendeira ou admin."
            }
         }
      },

      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
           isEmail: { msg: "Email inválido." },
         },
      },
      
      senha: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
           is: {
               args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
               msg: "A senha deve ter no mínimo 8 caracteres e no máximo 15, com letra maiúscula, minúscula, número e caractere especial.",
            },
         },
      },
   },
   {
      tableName: "usuario",
      createdAt: "criado_em",
      updatedAt: "atualizado_em",
   }
);

module.exports = Usuario;