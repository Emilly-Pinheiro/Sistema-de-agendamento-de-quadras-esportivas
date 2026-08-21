require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');

const quadraRoutes = require('./routes/quadraRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/quadras', quadraRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
