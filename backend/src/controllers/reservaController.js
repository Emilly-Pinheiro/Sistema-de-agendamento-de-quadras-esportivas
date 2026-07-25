const reservaService = require('../services/reservaService');

const criar = async (req, res) => {
    try {
        const novaReserva = await reservaService.criarReserva(req.body);
        return res.status(201).json(novaReserva);
    } catch (error) {
        if (error.message === "Já existe uma reserva para esta quadra neste horário.") {
            return res.status(400).json({ erro: error.message });
        }
        return res.status(500).json({ erro: "Erro interno ao cadastrar reserva.", detalhe: error.message });
    }
};

const listar = async (req, res) => {
    try {
        const reservas = await reservaService.listarReservas();
        return res.status(200).json(reservas);
    } catch (error) {
        return res.status(500).json({ erro: "Erro interno ao buscar reservas." });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const reservaAtualizada = await reservaService.atualizarReserva(id, req.body);
        return res.status(200).json(reservaAtualizada);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao atualizar reserva." });
    }
};

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        await reservaService.deletarReserva(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao deletar reserva." });
    }
};

module.exports = {
    criar,
    listar,
    atualizar,
    deletar
};