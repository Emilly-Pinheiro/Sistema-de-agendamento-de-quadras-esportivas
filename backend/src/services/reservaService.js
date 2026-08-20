require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const criarReserva = async (dadosReserva) => {
    const { jogador_id, quadra_id, data, horario_inicio, horario_fim } = dadosReserva;
    const dataBusca = new Date(data);
    const inicioBusca = new Date(horario_inicio);
    const fimBusca = new Date(horario_fim);

    const reservaExistente = await prisma.reserva.findFirst({
        where: {
            quadra_id: quadra_id,
            data: dataBusca,
            horario_inicio: {
                lt: fimBusca
            },
            horario_fim: {
                gt: inicioBusca
            }
        }
    });

    if (reservaExistente) {
        throw new Error("Já existe uma reserva para esta quadra neste horário.");
    }

    const novaReserva = await prisma.reserva.create({
        data: {
            jogador_id: jogador_id,
            quadra_id: quadra_id,
            data: dataBusca,
            horario_inicio: inicioBusca,
            horario_fim: fimBusca
        }
    });

    return novaReserva;
};

const listarReservas = async () => {
    return await prisma.reserva.findMany({
        include: {
            jogador: true,
            quadra: true
        }
    });
};

const atualizarReserva = async (id, dadosReserva) => {
    return await prisma.reserva.update({
        where: { id: id },
        data: dadosReserva
    });
};

const buscarPorId = async (id) => {
    return await prisma.reserva.findUnique({
        where: { id: id }
    });
};

const deletarReserva = async (id) => {
    return await prisma.reserva.delete({
        where: { id: id }
    });
};

module.exports = {
    criarReserva,
    listarReservas,
    atualizarReserva,
    deletarReserva,
    buscarPorId
};