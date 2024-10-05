// src/components/Login.js
import React from 'react';
import '../css/login.css';

const Login = () => {
  return (
    <div className="login-overlay">
      <div className="login-modal">
        {/* 로고 섹션 */}
        <div className="logo-section">
          <img src="/images/join/join-login-datainc_icon.svg" alt="데이터잉크-로고" className="logo" />
          <span className="logo-text">Data Inc</span>
        </div>

        {/* 환영 텍스트 */}
        <div className="welcome-text">
          <div className="main-text">계정에 로그인 하세요.</div>
          <div className="sub-text">Data ink 방문을 환영합니다!</div>
        </div>

        {/* 소셜 로그인 */}
        <div className="social-login">
          <div className="social-buttons">
            <img src="/images/login/login-naver_icon.svg" alt="네이버-소셜아이콘" className="social-icon" />
            <img src="/images/login/login-google_icon.svg" alt="구글-소셜아이콘" className="social-icon" />
            <img src="/images/login/login-kakao_icon.svg" alt="카카오-소셜아이콘" className="social-icon" />
            <img src="/images/login/login-facebook_icon.svg" alt="페이스북-소셜아이콘" className="social-icon" />
          </div>
        </div>

        {/* 구분선 */}
        <div className="divider">
          <div className="line"></div>
          <div className="divider-text">또는 아이디 로그인</div>
          <div className="line"></div>
        </div>

        {/* 아이디 입력 필드 */}
        <div className="input-field">
          <img src="/images/login/login-id-input_icon.svg" alt="아이디-아이콘" className="input-icon" />
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            className="input"
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="input-field">
          <img src="/images/login/login-password-input_icon.svg" alt="비밀번호 아이콘" className="input-icon" />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="input"
          />
          <img src="/images/login/login-password-input-hide_icon.svg" alt="비밀번호 보기" className="input-icon-right" />
        </div>

        {/* 아이디 기억 및 비밀번호 찾기 */}
        <div className="options">
          <div className="remember-me">
            <input type="checkbox" id="remember" className="checkbox" />
            <label htmlFor="remember" className="remember-text">아이디를 기억하겠습니다.</label>
          </div>
          <div className="find-links">
            <a href="http://localhost:3000/findaccount" className="find-link">아이디비밀번호 찾기</a>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <div className="login-button">
          <button className="button">로그인</button>
        </div>

        {/* 회원가입 유도 텍스트 */}
        <div className="register-prompt">
          <span>회원이 아니신가요? 지금 </span>
          <a href="http://localhost:3000/Join" className="register-link">계정을 생성</a>
          <span>해 보세요!</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
