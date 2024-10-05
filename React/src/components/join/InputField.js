// src/components/InputField.js
import React from 'react';

const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  isValid,
  className,
}) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      aria-label={`${name} 입력`}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`input-field ${isValid ? 'valid' : ''} ${className}`}
    />
  );
};

export default InputField;
