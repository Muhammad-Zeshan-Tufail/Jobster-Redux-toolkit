import React from "react";

const FormRow = ({ name, type, value, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
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
