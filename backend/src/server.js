const express = require('express');
const cors = require('cors');

const reservaRoutes = require('./routes/reservaRoutes');
const jogadorRoutes = require('./routes/jogadorRoutes');
const quadraRoutes = require('./routes/quadraRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/reservas', reservaRoutes);
app.use('/jogadores', jogadorRoutes);
app.use('/quadras', quadraRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});