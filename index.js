import express from 'express';
import itemRoutes from './routes/itemRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Usar rotas do itemRoutes
app.use("/api", itemRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// inicie o servidor com `npm run dev`
