const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const criarJogador = async (dados) => {
    if (!dados.nome || !dados.email || !dados.telefone) {
        throw new Error("Nome, email e telefone são obrigatórios.");
    }
    
    return await prisma.jogador.create({
        data: {
            nome: dados.nome,
            email: dados.email,
            telefone: dados.telefone
        }
    });
};

const listarJogadores = async () => {
    return await prisma.jogador.findMany();
};

const buscarPorId = async (id) => {
    const jogador = await prisma.jogador.findUnique({
        where: { id: id }
    });

    if (!jogador) {
        throw new Error("Jogador não encontrado.");
    }
    return jogador;
};

const atualizarJogador = async (id, dados) => {
    return await prisma.jogador.update({
        where: { id: id },
        data: dados
    });
};

const deletarJogador = async (id) => {
    return await prisma.jogador.delete({
        where: { id: id }
    });
};

module.exports = {
    criarJogador,
    listarJogadores,
    buscarPorId,
    atualizarJogador,
    deletarJogador
};