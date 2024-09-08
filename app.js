import express from 'express';
import contasRoutes from './routes/contasRoutes.js'; 

const app = express();

// permite o visulizar o json no corpo das contas criadas
app.use(express.json());

// utilizando as rotas
app.use('/api/contas', contasRoutes);

// definindo a porta que o servidor será executado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
