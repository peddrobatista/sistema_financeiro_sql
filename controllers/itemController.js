import { db } from '../db.js';

export const getItems = (req, res) => {
    const query = 'SELECT * FROM registros';  // Substitua "sua_tabela" pelo nome da sua tabela
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar dados:', err);
            res.status(500).send('Erro ao recuperar dados');
            return;
        }
        res.json(results);
    });
};

// Adicione mais métodos como insertItem, updateItem, deleteItem conforme necessário

