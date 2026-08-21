import quadrasNoite from '../assets/quadras-noite.png';
import '../styles/auth.css';

function AuthLayout({ title, children }) {
  return (
    <div className="auth-layout">
      <div className="auth-panel">
        <div className="auth-panel-content">
          <h1 className="auth-title">
            {title}
            <span className="auth-title-underline" />
          </h1>
          {children}
        </div>
      </div>

      <div className="auth-image">
        <img src={quadrasNoite} alt="Quadras esportivas iluminadas à noite" />
        <div className="auth-image-overlay">
          <h2>
            Sistema de Reserva de Quadras
            <span className="auth-image-underline" />
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
