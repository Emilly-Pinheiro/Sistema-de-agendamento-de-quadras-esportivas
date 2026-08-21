const BASE_URL = '/auth';

async function request(path, body) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
  }

  const raw = await response.text();
  let data = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.erro || 'Ocorreu um erro. Tente novamente.');
  }

  if (!data) {
    throw new Error('O servidor não respondeu como esperado. Tente novamente.');
  }

  return data;
}

export function cadastrar({ nome, email, telefone, senha }) {
  return request('/register', { nome, email, telefone, senha });
}

export function login({ email, senha }) {
  return request('/login', { email, senha });
}
