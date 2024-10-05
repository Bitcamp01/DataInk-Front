// src/components/ValidationMessages.js
import React from 'react';

const ValidationMessages = ({ visible, rules }) => {
  if (!visible) return null;

  return (
    <div className="validation-messages visible">
      {rules.map((rule, index) => (
        <p key={index} className={rule.isValid ? 'valid' : 'invalid'}>
          {rule.message}
        </p>
      ))}
    </div>
  );
};

export default ValidationMessages;
