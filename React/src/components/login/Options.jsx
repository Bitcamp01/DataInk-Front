import React from 'react';

const Options = () => (
  <div className="options">
    <div className="remember-me">
      <input type="checkbox" id="remember" className="checkbox" />
      <label htmlFor="remember" className="remember-text">아이디를 기억하겠습니다.</label>
    </div>
    <div className="find-links">
      <Link to="/findaccount" className="find-link">아이디비밀번호 찾기</Link>
    </div>
  </div>
);

export default Options;