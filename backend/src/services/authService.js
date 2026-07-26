const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const criarUsuario = async (dados) => {
    if (!dados.nome || !dados.email || !dados.senha) {
        throw new Error("Nome, email e senha são obrigatórios.");
    }

    const usuarioExistente = await prisma.usuario.findUnique({ where: { email: dados.email } });
    if (usuarioExistente) {
        throw new Error("E-mail já cadastrado.");
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const usuario = await prisma.usuario.create({
        data: {
            id: crypto.randomUUID(),
            nome: dados.nome,
            email: dados.email,
            senha: senhaHash,
        },
    });

    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
};

const login = async (dados) => {
    if (!dados.email || !dados.senha) {
        throw new Error("Email e senha são obrigatórios.");
    }

    const usuario = await prisma.usuario.findUnique({ where: { email: dados.email } });
    if (!usuario) {
        throw new Error("E-mail ou senha inválidos.");
    }

    const senhaCorreta = await bcrypt.compare(dados.senha, usuario.senha);
    if (!senhaCorreta) {
        throw new Error("E-mail ou senha inválidos.");
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token };
};

module.exports = { criarUsuario, login };