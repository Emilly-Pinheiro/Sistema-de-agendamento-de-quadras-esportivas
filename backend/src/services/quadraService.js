const prisma = require('../lib/prisma');

const listarQuadras = async (busca) => {
    return await prisma.quadra.findMany({
        where: busca
            ? { nome: { contains: busca, mode: 'insensitive' } }
            : undefined,
        orderBy: { nome: 'asc' },
    });
};

const buscarQuadraPorId = async (id) => {
    const quadra = await prisma.quadra.findUnique({ where: { id } });

    if (!quadra) {
        throw new Error('Quadra não encontrada.');
    }

    return quadra;
};

const criarQuadra = async (dadosQuadra) => {
    const { nome, modalidade, cep, cidade, uf, rua, numero, imagens } = dadosQuadra;

    return await prisma.quadra.create({
        data: { nome, modalidade, cep, cidade, uf, rua, numero, imagens },
    });
};

const atualizarQuadra = async (id, dadosQuadra) => {
    await buscarQuadraPorId(id);

    const { nome, modalidade, cep, cidade, uf, rua, numero, imagens } = dadosQuadra;

    return await prisma.quadra.update({
        where: { id },
        data: { nome, modalidade, cep, cidade, uf, rua, numero, imagens },
    });
};

const deletarQuadra = async (id) => {
    await buscarQuadraPorId(id);

    return await prisma.quadra.delete({ where: { id } });
};

module.exports = {
    listarQuadras,
    buscarQuadraPorId,
    criarQuadra,
    atualizarQuadra,
    deletarQuadra,
};
