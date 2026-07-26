const quadraService = require('../services/quadraService');

const criar = async (req, res) => {
    try {
        const quadra = await quadraService.criarQuadra(req.body);
        return res.status(201).json({
            mensagem: "Quadra cadastrada com sucesso.",
            dados: quadra
        });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const listar = async (req, res) => {
    try {
        const quadras = await quadraService.listarQuadras();
        return res.status(200).json(quadras);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao buscar quadras." });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const quadra = await quadraService.buscarPorId(req.params.id);
        return res.status(200).json(quadra);
    } catch (error) {
        return res.status(404).json({ erro: error.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const quadra = await quadraService.atualizarQuadra(req.params.id, req.body);
        return res.status(200).json({
            mensagem: "Quadra atualizada com sucesso.",
            dados: quadra
        });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao atualizar quadra." });
    }
};

const deletar = async (req, res) => {
    try {
        await quadraService.deletarQuadra(req.params.id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao deletar quadra." });
    }
};

module.exports = {
    criar,
    listar,
    buscarPorId,
    atualizar,
    deletar
};