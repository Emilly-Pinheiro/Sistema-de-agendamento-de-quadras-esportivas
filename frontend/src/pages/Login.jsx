import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField from '../components/FormField.jsx';
import PasswordField from '../components/PasswordField.jsx';
import { login } from '../services/authService.js';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const { dados } = await login(form);
      localStorage.setItem('token', dados.token);
      navigate('/');
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <div>
          <PasswordField
            label="Senha"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Link to="/esqueci-senha" className="auth-link-small">
            Esqueci minha senha
          </Link>
        </div>

        {erro && <p className="auth-error">{erro}</p>}

        <button type="submit" className="auth-submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="auth-switch">
          ou <Link to="/cadastro">Criar conta</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
