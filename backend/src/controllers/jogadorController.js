const jogadorService = require('../services/jogadorService');

const criar = async (req, res) => {
    try {
        const jogador = await jogadorService.criarJogador(req.body);
        return res.status(201).json({
            mensagem: "Jogador cadastrado com sucesso.",
            dados: jogador
        });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const listar = async (req, res) => {
    try {
        const jogadores = await jogadorService.listarJogadores();
        return res.status(200).json(jogadores);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao buscar jogadores." });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const jogador = await jogadorService.buscarPorId(req.params.id);
        return res.status(200).json(jogador);
    } catch (error) {
        return res.status(404).json({ erro: error.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const jogador = await jogadorService.atualizarJogador(req.params.id, req.body);
        return res.status(200).json({
            mensagem: "Jogador atualizado com sucesso.",
            dados: jogador
        });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao atualizar jogador." });
    }
};

const deletar = async (req, res) => {
    try {
        await jogadorService.deletarJogador(req.params.id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao deletar jogador." });
    }
};

module.exports = {
    criar,
    listar,
    buscarPorId,
    atualizar,
    deletar
};