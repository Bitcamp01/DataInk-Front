import React from 'react';

const InputField = ({ iconSrc, placeholder, type, rightIconSrc }) => (
  <div className="input-field">
    <img src={iconSrc} alt="아이콘" className="input-icon" />
    <input type={type} placeholder={placeholder} className="input" />
    {rightIconSrc && <img src={rightIconSrc} alt="비밀번호 보기" className="input-icon-right" />}
  </div>
);

export default InputField;