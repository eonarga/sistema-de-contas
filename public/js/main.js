document.getElementById('contaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const vencimento = document.getElementById('vencimento').value;
    const tipo = document.getElementById('tipo').value;

    const response = await fetch('/api/contas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descricao, valor, vencimento, tipo })
    });

    if (response.ok) {
        document.getElementById('contaForm').reset();
        loadContas();
    }
});

async function loadContas() {
    const response = await fetch('/api/contas');
    const contas = await response.json();

    const contasList = document.getElementById('contasList');
    contasList.innerHTML = '';

    contas.forEach(conta => {
        const { descricao, valor, vencimento, tipo, status, id } = conta;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${descricao}</td>
            <td>R$ ${valor.toFixed(2)}</td>
            <td>${vencimento}</td>
            <td>${tipo}</td>
            <td>${status}</td>
            <td>
                <button onclick="editConta(${id})">Editar</button>
                <button onclick="deleteConta(${id})">Excluir</button>
            </td>
        `;

        contasList.appendChild(tr);
    });

    loadTotais();
}

async function loadTotais() {
    const response = await fetch('/api/contas/totais');
    const { totalPagar, totalReceber, totalGeral } = await response.json();

    document.getElementById('contasPagar').innerText = `R$ ${totalPagar.toFixed(2)}`;
    document.getElementById('contasReceber').innerText = `R$ ${totalReceber.toFixed(2)}`;
    document.getElementById('totalContas').innerText = `R$ ${totalGeral.toFixed(2)}`;
}

async function deleteConta(id) {
    const response = await fetch(`/api/contas/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        loadContas();
    }
}

async function editConta(id) {
    const response = await fetch(`/api/contas/${id}`);
    const conta = await response.json();

    document.getElementById('descricao').value = conta.descricao;
    document.getElementById('valor').value = conta.valor;
    document.getElementById('vencimento').value = conta.vencimento;
    document.getElementById('tipo').value = conta.tipo;

    await deleteConta(id);
}

loadContas();
