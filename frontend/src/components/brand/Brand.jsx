import { Link } from '../../routes/navigation.jsx'

export default function Brand({ compact = false }) {
  return (
    <Link className={`brand${compact ? ' brand--compact' : ''}`} to="/" aria-label="Curtesporte - página inicial">
      <img className="brand__symbol" src="https://www.figma.com/api/mcp/asset/2819d059-1d8f-4f79-9b8c-3f72de8f61e9.svg" alt="" />
      <span className="brand__content">
        <strong className="brand__name">Curtesporte - Sistema de reserva de quadras</strong>
        <span className="brand__underline" aria-hidden="true" />
      </span>
    </Link>
  )
}
