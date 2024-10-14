// src/components/Login.js
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/userApis'
import '../css/login.css';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        id: '',
        password: ''
    });

    const navi = useNavigate();
    const dispatch = useDispatch();

    // 비밀번호 표시 상태
    const [showPassword, setShowPassword] = useState(false);

    // 비밀번호 표시/숨기기 토글 핸들러
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    // 입력값 변화 시 loginForm 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // 로그인 핸들러
    const handleLogin = useCallback((e) => {
        e.preventDefault();

        // dispatch의 비동기 처리가 제대로 완료됐을 때는 then 메소드의 state에 
        // action 객체가 하나 넘어오고 에러가 발생했을 때는 에러 action 객체가 담긴다.
        dispatch(login(loginForm)).then((action) => {
            if(action.type === 'users/login/fulfilled') {
                navi("/dashboard");
        }
    });

}, [loginForm, dispatch, navi]);

    return (
        <div className="login__overlay" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
            <div className="login__modal">
                {/* 로고 섹션 */}
                <div className="login__logo-section">
                    <img
                        src="../images/join/join-login-datainc_icon.svg"
                        alt="데이터잉크 로고"
                        className="login__logo"
                    />
                    <span className="login__logo-text">Data Inc</span>
                </div>

                {/* 환영 메시지 */}
                <div className="login__welcome-text">
                    <div className="login__main-text">계정에 로그인 하세요.</div>
                    <div className="login__sub-text">Data ink 방문을 환영합니다!</div>
                </div>

                {/* 소셜 로그인 버튼 */}
                <div className="login__social-login">
                    <div className="login__social-buttons">
                        <img
                            src="../images/login/login-naver_icon.svg"
                            alt="네이버 소셜 아이콘"
                            className="login__social-icon"
                        />
                        <img
                            src="../images/login/login-google_icon.svg"
                            alt="구글 소셜 아이콘"
                            className="login__social-icon"
                        />
                        <img
                            src="../images/login/login-kakao_icon.svg"
                            alt="카카오 소셜 아이콘"
                            className="login__social-icon"
                        />
                        <img
                            src="../images/login/login-facebook_icon.svg"
                            alt="페이스북 소셜 아이콘"
                            className="login__social-icon"
                        />
                    </div>
                </div>

                {/* 구분선 */}
                <div className="login__divider">
                    <div className="login__line"></div>
                    <div className="login__divider-text">또는 아이디 로그인</div>
                    <div className="login__line"></div>
                </div>

                {/* 로그인 폼 */}
                <form className="login__form" onSubmit={handleLogin}>
                    {/* 아이디 입력 필드 */}
                    <div className="login__input-field">
                        <img
                            src="../images/login/login-id-input_icon.svg"
                            alt="아이디 아이콘"
                            className="login__input-icon"
                        />
                        <input
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            className="login__input"
                            aria-label="아이디 입력"
                            name="id"
                            value={loginForm.id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* 비밀번호 입력 필드 */}
                    <div className="login__input-field">
                        <img
                            src="../images/login/login-password-input-hide_icon.svg"
                            alt="비밀번호 아이콘"
                            className="login__input-icon"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호를 입력해주세요."
                            className="login__input"
                            aria-label="비밀번호 입력"
                            name="password"
                            value={loginForm.password}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="login__input-icon--right"
                            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                        >
                            <img
                                src={
                                    showPassword
                                        ? "../images/login/login-password-input-hide_icon.svg"
                                        : "../images/login/login-password-input-show_icon.svg"
                                }
                                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                            />
                        </button>
                    </div>

                    {/* 로그인 옵션 */}
                    <div className="login__options">
                        <div className="login__remember-me">
                            <input type="checkbox" id="remember" className="login__checkbox" />
                            <label htmlFor="remember" className="login__remember-text">아이디를 기억하겠습니다.</label>
                        </div>
                        <div className="login__find-links">
                            <Link to="/findaccount" className="login__find-link">아이디 / 비밀번호 찾기</Link>
                        </div>
                    </div>

                    {/* 로그인 버튼 */}
                    <div className="login__button">
                        <button type="submit" className="login__button">로그인</button>
                    </div>
                </form>

                {/* 메시지 표시 */}
                {/* {message && <p className="login__message">{message}</p>} */}

                {/* 회원가입 유도 메시지 */}
                <div className="login__register-prompt">
                    <span>회원이 아니신가요? 지금 </span>
                    <Link to="/join" className="login__register-link">계정을 생성</Link>
                    <span>해 보세요!</span>
                </div>
            </div>
        </div>
    );

};

export default Login;
