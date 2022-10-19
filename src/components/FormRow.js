const FormRow = ({ type, name, value, onChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
