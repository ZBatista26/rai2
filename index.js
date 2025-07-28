const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./src/config/configDB');
const authRoute = require('./src/modules/autenticacao/routes/autenticacao.route');
const usuarioRoute = require('./src/modules/usuario/routes/usuario.route');
const refeicaoRoute = require('./src/modules/refeicao/routes/refeicao.route');
const alunoRoute = require('./src/modules/aluno/routes/aluno.route');

dotenv.config();

const app = express();

app.use(cors({
   origin: 'http://localhost:3891',
   credentials: true
}));

app.use(express.json());

// caminho das rotas
app.use('/api/', authRoute)
app.use('/api/', usuarioRoute)
app.use('/api/', refeicaoRoute)
app.use('/api/', alunoRoute)

// porta de conexao
const PORTA = process.env.PORTA;
app.listen(PORTA, async () => {
   try {
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso.');

      await sequelize.sync({ force: false, alter: false });
      console.log('Banco de dados sincronizado com sucesso.');
   } catch (err) {
      console.error('Erro ao conectar ou sincronizar o banco de dados:', err);
   }
   console.log(`Servidor rodando na porta ${PORTA}`);
});