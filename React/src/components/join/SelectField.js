// src/components/SelectField.js
import React from 'react';

const SelectField = ({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  isValid,
  children,
}) => {
  return (
    <select
      id={name}
      name={name}
      aria-label={`${name} 선택`}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`input-field ${isValid ? 'valid' : ''}`}
    >
      {children}
    </select>
  );
};

export default SelectField;
