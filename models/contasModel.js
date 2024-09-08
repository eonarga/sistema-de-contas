// armazena o array das contas na memoria
let contas = []; 

// função para listar todas as contas
export function listarContas() {
    return contas;
}

// função para adicionar uma nova conta
export function adicionarConta(novaConta) {
    contas.push(novaConta);
}

// função para buscar uma conta pelo ID, utilizado para editar e excluir
export function buscarContaPorId(id) {
    return contas.find(conta => conta.id === id);
}

// função para editar uma conta existente
export function editarConta(id, dadosAtualizados) {
    const conta = buscarContaPorId(id);
    if (conta) {
        Object.assign(conta, dadosAtualizados); 
        return conta;
    }
    return null; 
}

// função para remover uma conta cadastrada
export function removerConta(id) {
    const indice = contas.findIndex(conta => conta.id === id);
    if (indice !== -1) {
        return contas.splice(indice, 1); 
    }
    return null;
}

// função para calcular o total de contas a pagar ou receber e utilizar o reduce para mostrar a diferença
export function totalContas(tipo) {
    return contas
        .filter(conta => conta.tipo === tipo)
        .reduce((total, conta) => total + conta.valor, 0);
}
