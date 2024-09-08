import express from 'express';
import {
    listarTodasContas,
    criarConta,
    atualizarConta,
    removerContaPorId,
    listarTotais
} from '../controllers/contasController.js';

const router = express.Router();

// rota para listar todas as contas cadastradas
router.get('/', listarTodasContas);

// rota para criar uma nova conta
router.post('/', criarConta);

// rota para atualizar uma conta já existentente
router.put('/:id', atualizarConta);

// rota para remover uma conta existente
router.delete('/:id', removerContaPorId);

// rota para listar os totais de contas a pagar e a receber e mostrar a diferença
router.get('/totais', listarTotais);

export default router;
