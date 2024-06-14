import express from 'express';
import { getItems } from '../controllers/itemController.js';

const router = express.Router();

router.get('/itens', getItems);
// Adicione mais rotas conforme necessário (POST, PUT, DELETE)

export default router;
