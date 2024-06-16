import { db } from '../db.js';

export const getItems = (req, res) => {
    const query = 'SELECT * FROM registros';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar dados:', err);
            res.status(500).send('Erro ao recuperar dados');
            return;
        }
        res.json(results);
    });
};
export const insertItem = (req, res) => {
    const { descricao, valor, tipo } = req.body;
    const query = 'INSERT INTO registros (descricao, valor, tipo) VALUES (?, ?, ?)';
    db.query(query, [descricao, valor, tipo], (err) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados');
            return;
        }
        res.status(201).send('Item inserido com sucesso');
    });
};

export const deleteItem = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM registros WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Erro ao deletar dados:', err);
            res.status(500).send('Erro ao deletar dados');
            return;
        }
        res.status(200).send('Item deletado com sucesso');
    });
};
// Adicione mais métodos como insertItem, updateItem, deleteItem conforme necessário

