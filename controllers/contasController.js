import {
    listarContas,
    adicionarConta,
    buscarContaPorId,
    editarConta,
    removerConta,
    totalContas
} from '../models/contasModel.js';

// função para listar todas as contas e retornar o status 200
export function listarTodasContas(req, res) {
    const contas = listarContas();
    return res.status(200).json(contas);
}

// função para criar uma nova conta com as informações de tipo, valor, descrição e vencimento
export function criarConta(req, res) {
    const { tipo, valor, descricao, vencimento } = req.body;
    if (!tipo || !valor || !descricao || !vencimento) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }


    // gera um ID único para cada nova conta
    const novaConta = {
        id: Date.now(), 
        tipo,
        valor,
        descricao,
        vencimento,
        status: 'pendente'
    };

    adicionarConta(novaConta);
    return res.status(201).json(novaConta);
}

// função para atualizar uma conta existente pela url
export function atualizarConta(req, res) {
    const id = parseInt(req.params.id); // utiliza o id da url
    const dadosAtualizados = req.body;

    const conta = buscarContaPorId(id); // usa a funçao buscarContaPorId para localisar a conta
    if (!conta) {
        return res.status(404).json({ error: 'Conta não foi encontrada.' });
    }

    const contaAtualizada = editarConta(id, dadosAtualizados); 
    return res.status(200).json(contaAtualizada);
}

// função para remover uma conta existente
export function removerContaPorId(req, res) {
    const id = parseInt(req.params.id); // utiliza o id da url

    const conta = buscarContaPorId(id); // usa a funçao buscarContaPorId para localisar a conta
    if (!conta) {
        return res.status(404).json({ error: 'Conta não foi encontrada.' });
    }

    removerConta(id);
    return res.status(200).json({ message: 'Conta removida com sucesso.' });
}

// função para listar os totais de contas a pagar e receber e o total geral que é a diferença entre os dois
export function listarTotais(_, res) {
    const totalPagar = totalContas('pagar');
    const totalReceber = totalContas('receber');
    const totalGeral = totalReceber - totalPagar;

    return res.status(200).json({
        totalPagar,
        totalReceber,
        totalGeral
    });
}
