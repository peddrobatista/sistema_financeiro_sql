const incomes = document.querySelector(".incomes");

async function fetchData() {
    try {
        const response = await fetch('/api/itens');
        const data = await response.json();
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';

        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.descricao}</td>
                <td>R$ ${row.valor}</td>
                <td class="columnType">${
                    row.tipo === "E"
                    ? '<i class="bx bxs-chevron-up-circle"></i>'
                    : '<i class="bx bxs-chevron-down-circle"></i>'
                }</td>
                <!-- Adicione mais colunas conforme necessário -->
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

fetchData();