import express from 'express';
import { fileURLToPath } from 'url';

// API Fetch fornece uma interface JavaScript para acessar e manipular
// partes do pipeline HTTP, tais como os pedidos e respostas
import path from 'path';
import contasRoutes from './routes/contasRoutes.js'; 

// Definir __dirname com ES Modules
// no CommonJS, essas variáveis são globais, enquanto no ES Modules precisamos simulá-las com a ajuda do módulo url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// permite o visulizar o json no corpo das contas criadas
app.use(express.json());

// usar arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// utilizando as rotas
app.use('/api/contas', contasRoutes);

// definindo a porta que o servidor será executado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está operante na porta ${PORT} 🤖`);
});
