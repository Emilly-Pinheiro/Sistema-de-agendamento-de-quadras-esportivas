import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function PasswordField({ label, value, onChange, name, autoComplete }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="form-field">
      <span className="form-field-label">{label}</span>
      <span className="password-field-row">
        <input
          type={visible ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </span>
    </label>
  );
}

export default PasswordField;
