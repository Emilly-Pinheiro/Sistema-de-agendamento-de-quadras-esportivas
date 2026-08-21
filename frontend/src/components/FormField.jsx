function FormField({ label, ...inputProps }) {
  return (
    <label className="form-field">
      <span className="form-field-label">{label}</span>
      <input {...inputProps} />
    </label>
  );
}

export default FormField;
