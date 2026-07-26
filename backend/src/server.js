const express = require('express');

const reservaRoutes = require('./routes/reservaRoutes');
const jogadorRoutes = require('./routes/jogadorRoutes');
const quadraRoutes = require('./routes/quadraRoutes');

const app = express();

app.use(express.json());

app.use('/reservas', reservaRoutes);
app.use('/jogadores', jogadorRoutes);
app.use('/quadras', quadraRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});