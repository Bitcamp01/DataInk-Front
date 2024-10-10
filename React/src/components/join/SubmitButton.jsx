import React from 'react';

const SubmitButton = ({ isFormValid }) => (
  <div className="submit-button">
    <button type="submit" disabled={!isFormValid}>
      회원가입
    </button>
  </div>
);

export default SubmitButton;