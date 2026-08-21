const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function tratarResposta(resposta) {
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}))
    throw new Error(erro.erro || 'Erro ao comunicar com o servidor.')
  }

  if (resposta.status === 204) {
    return null
  }

  return resposta.json()
}

export function listarQuadras(busca) {
  const query = busca ? `?busca=${encodeURIComponent(busca)}` : ''
  return fetch(`${API_URL}/quadras${query}`).then(tratarResposta)
}

export function buscarQuadraPorId(id) {
  return fetch(`${API_URL}/quadras/${id}`).then(tratarResposta)
}

export function criarQuadra(formData) {
  return fetch(`${API_URL}/quadras`, {
    method: 'POST',
    body: formData,
  }).then(tratarResposta)
}

export function atualizarQuadra(id, formData) {
  return fetch(`${API_URL}/quadras/${id}`, {
    method: 'PUT',
    body: formData,
  }).then(tratarResposta)
}

export function deletarQuadra(id) {
  return fetch(`${API_URL}/quadras/${id}`, {
    method: 'DELETE',
  }).then(tratarResposta)
}

export function urlDaImagem(caminho) {
  return caminho.startsWith('http') ? caminho : `${API_URL}${caminho}`
}
