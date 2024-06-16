const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let items = [];

btnNew.onclick = () => {
  if (descItem.value === "" || amount.value === "" || type.value === "") {
    return alert("Preencha todos os campos!");
  }

  addItem(descItem.value, amount.value, type.value);
    descItem.value = "";
    amount.value = "";
    type.value = "";
};

// Função para buscar itens do servidor e atualizar a tabela e o resumo.
async function fetchItems() {
    try {
        const response = await fetch('/api/itens');
        const data = await response.json();
        items = data;
        updateTable();
        updateSummary();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Função para atualizar a tabela HTML com os itens.
function updateTable() {
    tbody.innerHTML = '';

    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.descricao}</td>
            <td>R$ ${item.valor}</td>
            <td class="columnType">${
                item.tipo === "E"
                ? '<i class="bx bxs-chevron-up-circle"></i>'
                : '<i class="bx bxs-chevron-down-circle"></i>'
            }</td>
            <td class="columnAction">
                <button onclick="deleteItem(${item.id})"><i class='bx bx-trash'></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para calcular e atualizar os valores de "Entrada", "Saída" e "Total".
function updateSummary() {
    let totalIncomes = 0;
    let totalExpenses = 0;

    items.forEach(item => {
        if (item.tipo === "E") {
            totalIncomes += parseFloat(item.valor);
        } else if (item.tipo === "S") {
            totalExpenses += parseFloat(item.valor);
        }
    });

    const totalValue = totalIncomes - totalExpenses;

    incomes.textContent = totalIncomes.toFixed(2);
    expenses.textContent = totalExpenses.toFixed(2);
    total.textContent = totalValue.toFixed(2);
}

// Função para adicionar um novo item via API e atualizar a tabela e o resumo.
async function addItem(desc, amount, type) {
    const newItem = { descricao: desc, valor: amount, tipo: type === "Entrada" ? "E" : "S" };
    try {
        await fetch('/api/itens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
        fetchItems();
    } catch (error) {
        console.error('Erro ao adicionar item:', error);
    }
}

// Função para deletar um item via API e atualizar a tabela e o resumo.
async function deleteItem(id) {
    try {
        await fetch(`/api/itens/${id}`, {
            method: 'DELETE'
        });
        fetchItems();
    } catch (error) {
        console.error('Erro ao deletar item:', error);
    }
}

// Inicializa os dados ao carregar a página
fetchItems();