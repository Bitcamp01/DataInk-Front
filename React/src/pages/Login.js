import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/userApis';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import '../css/login.css';

// 카카오 SDK는 window 객체에서 가져옵니다.
const { Kakao } = window;

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        id: '',
        password: ''
    });

    const navi = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleLogin = useCallback((e) => {
        e.preventDefault();
        dispatch(login(loginForm)).then((action) => {
            if (action.type === 'users/login/fulfilled') {
                navi("/dashboard");
            }
        });
    }, [loginForm, dispatch, navi]);

    const googleSocialLogin = useGoogleLogin({
        scope: "email profile",
        onSuccess: async ({ code }) => {
            try {
                const { data } = await axios.post("http://localhost:9090/auth/google/callback", { code });
                console.log(data);
                navi("/dashboard");
            } catch (error) {
                console.error('Google login error:', error);
            }
        },
        onError: (errorResponse) => {
            console.error(errorResponse);
        },
        flow: "auth-code",
    });

    // 카카오 로그인 핸들러
    const kakaoLoginHandler = () => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.authorize({
                redirectUri: 'http://localhost:9090/auth/kakao/callback',
            });
        } else {
            console.error("Kakao SDK가 로드되지 않았습니다.");
        }
    };

    // 네이버 SDK 초기화
    useEffect(() => {
        if (window.naver) {
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: 'j8_Y90ucR3pGMa_lXxg9', // 네이버에서 발급받은 클라이언트 ID
                callbackUrl: 'http://localhost:9090/auth/naver/callback',
                isPopup: false,
                loginButton: { color: 'green', type: 3, height: 50 },
            });
            naverLogin.init();
        } else {
            console.error('Naver SDK가 로드되지 않았습니다.');
        }
    }, []);

    // 네이버 로그인 후 사용자 정보 가져오기
    useEffect(() => {
        if (window.location.href.includes('access_token')) {
            const naverLogin = new window.naver.LoginWithNaverId();
            naverLogin.getLoginStatus((status) => {
                if (status) {
                    const userProfile = {
                        name: naverLogin.user.getName(),
                        email: naverLogin.user.getEmail(),
                        profile_image: naverLogin.user.getProfileImage(),
                    };
                    setUser(userProfile);
                    navi("/dashboard");
                } else {
                    console.error("네이버 로그인 실패");
                }
            });
        }
    }, [navi]);

    // 네이버 로그인 핸들러
    const naverLoginHandler = () => {
        if (window.naver) {
            // 숨겨진 네이버 로그인 버튼을 클릭하여 로그인 프로세스 시작
            const loginButton = document.getElementById('naverIdLogin').firstChild;
            if (loginButton) {
                loginButton.click();
            } else {
                console.error('네이버 로그인 버튼을 찾을 수 없습니다.');
            }
        } else {
            console.error('Naver SDK가 로드되지 않았습니다.');
        }
    };

    return (
        <div className="login__overlay" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
            <div className="login__modal">
                <div className="login__logo-section">
                    <img
                        src="../images/join/join-login-datainc_icon.svg"
                        alt="데이터잉크 로고"
                        className="login__logo"
                    />
                    <span className="login__logo-text">Data Inc</span>
                </div>

                <div className="login__welcome-text">
                    <div className="login__main-text">계정에 로그인 하세요.</div>
                    <div className="login__sub-text">Data ink 방문을 환영합니다!</div>
                </div>

                <div className="login__social-login">
                    <div className="login__social-buttons">
                        <Button
                            onClick={naverLoginHandler}
                            variant="contained"
                            color="success"
                            startIcon={<img src="../images/login/login-naver_icon.svg" alt="네이버 소셜 아이콘" className="login__social-icon" />}
                        >
                            네이버로 로그인
                        </Button>
                        <Button
                            onClick={kakaoLoginHandler}
                            variant="contained"
                            color="warning"
                            startIcon={<img src="../images/login/login-kakao_icon.svg" alt="카카오 소셜 아이콘" className="login__social-icon" />}
                        >
                            카카오로 로그인
                        </Button>
                        <Button
                            onClick={googleSocialLogin}
                            variant="contained"
                            color="primary"
                            startIcon={<img src="../images/login/login-google_icon.svg" alt="구글 소셜 아이콘" className="login__social-icon" />}
                        >
                            구글로 로그인
                        </Button>
                    </div>
                </div>

                {/* 숨겨진 네이버 로그인 버튼 */}
                <div id="naverIdLogin" style={{ display: 'none' }}></div>

                <div className="login__divider">
                    <div className="login__line"></div>
                    <div className="login__divider-text">또는 아이디 로그인</div>
                    <div className="login__line"></div>
                </div>

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

                    <div className="login__input-field">
                        <img
                            src="../images/login/login-password-input_icon.svg"
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
                                        : "../images/login/login-password-input-on_icon.svg"
                                }
                                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                            />
                        </button>
                    </div>


                    <div className="login__options">
                        <div className="login__remember-me">
                            <input type="checkbox" id="remember" className="login__checkbox" />
                            <label htmlFor="remember" className="login__remember-text">아이디를 기억하겠습니다.</label>
                        </div>
                        <div className="login__find-links">
                            <Link to="/findaccount" className="login__find-link">아이디 / 비밀번호 찾기</Link>
                        </div>
                    </div>

                    <div className="login__button">
                        <button type="submit" className="login__button">로그인</button>
                    </div>
                </form>

                {user && (
                    <div>
                        <h2>네이버 로그인 성공!</h2>
                        <h3>사용자 이름: {user.name}</h3>
                        <h3>사용자 이메일: {user.email}</h3>
                        <img src={user.profile_image} alt="프로필 사진" />
                    </div>
                )}
                
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
