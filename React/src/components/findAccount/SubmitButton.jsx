import React from 'react';

const SubmitButton = ({ activeTab }) => (
  <div className="submit-button">
    <button type="submit">
      {activeTab === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}
    </button>
  </div>
);

export default SubmitButton;