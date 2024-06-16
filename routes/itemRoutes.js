import express from 'express';
import { getItems, insertItem, deleteItem } from '../controllers/itemController.js';

const router = express.Router();

router.get('/itens', getItems);
router.post('/itens', insertItem);
router.delete('/itens/:id', deleteItem);
// Adicione mais rotas conforme necessário (POST, PUT, DELETE)

export default router;
