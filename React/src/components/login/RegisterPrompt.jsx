import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPrompt = () => (
  <div className="register-prompt">
    <span>회원이 아니신가요? 지금 </span>
    <Link to="/join" className="register-link">계정을 생성</Link>
    <span>해 보세요!</span>
  </div>
);

export default RegisterPrompt;