const UsuarioModel = require('../../usuario/models/usuario.model');
const bcrypt = require('bcrypt'); // removido o js no final

class UsuarioController {
   static async cadastrar(req, res) {
      try {
         const { /*id,*/ nome, papel, email, senha } = req.body;
         
         if (/*!id ||*/ !nome || !papel || !email || !senha) {
            return res.status(400).json({
               msg: "Todos os campos devem ser preenchidos"
            })
         };

         const senhaCriptografada = await bcrypt.hash(senha, 10);  
         await UsuarioModel.create({ /*id,*/ nome, papel, email, senha: senhaCriptografada });

         res.status(200).json({ msg: "Usuario cadastrado com sucesso!"});
      } catch (error) {
         res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message});
      }
   };

   static async perfil(req, res) {
      try {
         // const { id } = req.usuario;
         const { email } = req.usuario;
         const usuario = await UsuarioModel.findOne({
            // where: {id},
            where: { email },
            attributes: ['nome', 'papel', 'email']
         });

         if (!usuario) {
            return res.status(401).json({
               msg: "Não existe nenhum usuário cadastrado."
            })
         };

         res.status(200).json(usuario);
      } catch (error) {
         res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message});
      }
   };
};

module.exports = UsuarioController;