const quadraService = require('../services/quadraService');

const caminhosDosArquivos = (arquivos = []) =>
    arquivos.map((arquivo) => `/uploads/quadras/${arquivo.filename}`);

const listar = async (req, res) => {
    try {
        const { busca } = req.query;
        const quadras = await quadraService.listarQuadras(busca);
        return res.status(200).json(quadras);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno ao buscar quadras.' });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const quadra = await quadraService.buscarQuadraPorId(id);
        return res.status(200).json(quadra);
    } catch (error) {
        if (error.message === 'Quadra não encontrada.') {
            return res.status(404).json({ erro: error.message });
        }
        return res.status(500).json({ erro: 'Erro interno ao buscar quadra.' });
    }
};

const criar = async (req, res) => {
    try {
        const imagens = caminhosDosArquivos(req.files);
        const novaQuadra = await quadraService.criarQuadra({ ...req.body, imagens });
        return res.status(201).json(novaQuadra);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno ao cadastrar quadra.' });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const imagensMantidas = req.body.imagensMantidas ? JSON.parse(req.body.imagensMantidas) : [];
        const imagens = [...imagensMantidas, ...caminhosDosArquivos(req.files)];

        const quadraAtualizada = await quadraService.atualizarQuadra(id, { ...req.body, imagens });
        return res.status(200).json(quadraAtualizada);
    } catch (error) {
        if (error.message === 'Quadra não encontrada.') {
            return res.status(404).json({ erro: error.message });
        }
        return res.status(500).json({ erro: 'Erro ao atualizar quadra.' });
    }
};

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        await quadraService.deletarQuadra(id);
        return res.status(204).send();
    } catch (error) {
        if (error.message === 'Quadra não encontrada.') {
            return res.status(404).json({ erro: error.message });
        }
        return res.status(500).json({ erro: 'Erro ao deletar quadra.' });
    }
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
