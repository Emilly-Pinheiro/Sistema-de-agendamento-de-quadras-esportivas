import './ConfirmModal.css'

function ConfirmModal({ mensagem, onCancelar, onConfirmar }) {
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p>{mensagem}</p>
        <div className="confirm-modal-actions">
          <button className="btn btn-secondary" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={onConfirmar}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
