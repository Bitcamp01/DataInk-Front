import React from 'react';

const InputField = ({ name, label, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>
      <span className="required">*</span>{label}
    </label>
    <div className="input-wrapper">
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  </div>
);

export default InputField;