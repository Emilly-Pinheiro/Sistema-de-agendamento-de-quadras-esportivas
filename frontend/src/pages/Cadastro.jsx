import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField from '../components/FormField.jsx';
import PasswordField from '../components/PasswordField.jsx';
import { cadastrar } from '../services/authService.js';

const CAMPOS_INICIAIS = {
  nome: '',
  email: '',
  telefone: '',
  senha: '',
  confirmarSenha: '',
};

function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState(CAMPOS_INICIAIS);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);
    try {
      await cadastrar(form);
      navigate('/login');
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AuthLayout title="Criar Conta">
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          label="Nome completo"
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          autoComplete="name"
          required
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <FormField
          label="Telefone"
          type="tel"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          autoComplete="tel"
          required
        />
        <PasswordField
          label="Criar senha"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <PasswordField
          label="Confirmar senha"
          name="confirmarSenha"
          value={form.confirmarSenha}
          onChange={handleChange}
          autoComplete="new-password"
        />

        {erro && <p className="auth-error">{erro}</p>}

        <button type="submit" className="auth-submit" disabled={carregando}>
          {carregando ? 'Criando...' : 'Criar conta'}
        </button>

        <p className="auth-switch">
          ou <Link to="/login">Entrar</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Cadastro;
