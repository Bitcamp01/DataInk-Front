// src/components/FormGroup.js
import React from 'react';
import ValidationMessages from './ValidationMessages';
import CheckIcon from './CheckIcon';

const FormGroup = ({
  label,
  required,
  type,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  isValid,
  isFocused,
  validationRules,
  children,
}) => {
  return (
    <div
      className={`form-group ${isFocused ? 'active' : ''} ${isValid ? 'valid' : ''}`}
    >
      <label htmlFor={name}>
        {required && <span className="required">*</span>}
        {label}
      </label>
      <div className="input-wrapper">
        {children}
        {isValid && <CheckIcon />}
      </div>
      <ValidationMessages visible={isFocused && !isValid} rules={validationRules} />
    </div>
  );
};

export default FormGroup;
