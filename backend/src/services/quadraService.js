const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const criarQuadra = async (dados) => {
    if (!dados.nome || !dados.modalidade || !dados.localizacao) {
        throw new Error("Nome, modalidade e localização são obrigatórios.");
    }
    
    return await prisma.quadra.create({
        data: {
            nome: dados.nome,
            modalidade: dados.modalidade,
            localizacao: dados.localizacao
        }
    });
};

const listarQuadras = async () => {
    return await prisma.quadra.findMany();
};

const buscarPorId = async (id) => {
    const quadra = await prisma.quadra.findUnique({
        where: { id: id }
    });

    if (!quadra) {
        throw new Error("Quadra não encontrada.");
    }
    return quadra;
};

const atualizarQuadra = async (id, dados) => {
    return await prisma.quadra.update({
        where: { id: id },
        data: dados
    });
};

const deletarQuadra = async (id) => {
    return await prisma.quadra.delete({
        where: { id: id }
    });
};

module.exports = {
    criarQuadra,
    listarQuadras,
    buscarPorId,
    atualizarQuadra,
    deletarQuadra
};