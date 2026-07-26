const authService = require('../services/authService');

const cadastrar = async (req, res) => {
    try {
        const usuario = await authService.criarUsuario(req.body);
        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso.",
            dados: usuario
        });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

const login = async (req, res) => {
    try {
        const resultado = await authService.login(req.body);
        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            dados: resultado
        });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
};

module.exports = { cadastrar, login };