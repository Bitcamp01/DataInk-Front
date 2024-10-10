// src/components/Join.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/join.css';

const Join = () => {
    const navigate = useNavigate();

    // 상태 관리
    const [username, setUsername] = useState('');
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [carrier, setCarrier] = useState('');
    const [phone, setPhone] = useState('');

    // 유효성 검사 상태
    const [usernameValid, setUsernameValid] = useState({
        lettersAndNumbersOnly: false,
        minLength: false,
        hasNumber: false,
    });

    const [nameValid, setnameValid] = useState({
        notEmpty: false,
        isValidFormat: false,
    });

    const [emailValid, setEmailValid] = useState({
        format: false,
    });

    const [passwordValid, setPasswordValid] = useState({
        hasSpecialChar: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
    });

    const [confirmPasswordValid, setConfirmPasswordValid] = useState({
        matches: false,
    });

    // 포커스 상태 관리
    const [focusedField, setFocusedField] = useState('');

    // 메시지 상태
    const [message, setMessage] = useState('');

    // 유효성 검사 함수
    const validateUsername = (value) => {
        const lettersAndNumbersOnly = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value);
        const minLength = value.length >= 6;
        const hasNumber = /\d/.test(value);
        setUsernameValid({ lettersAndNumbersOnly, minLength, hasNumber });
    };

    const validatename = (value) => { 
        const notEmpty = value.trim() !== '';
        const isValidFormat = /^[가-힣\s]+$/.test(value);
        setnameValid({ notEmpty, isValidFormat });
    };

    const validateEmail = (value) => {
        const format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setEmailValid({ format });
    };

    const validatePassword = (value) => {
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        setPasswordValid({ hasSpecialChar, hasUppercase, hasLowercase, hasNumber });
    };

    const validateConfirmPassword = (value) => {
        const matches = value === password && value !== '';
        setConfirmPasswordValid({ matches });
    };

    // useEffect를 사용하여 실시간으로 유효성 검사
    useEffect(() => {
        validateUsername(username);
    }, [username]);

    useEffect(() => {
        validatename(name);
    }, [name]);

    useEffect(() => {
        validateEmail(email);
    }, [email]);

    useEffect(() => {
        validatePassword(password);
        validateConfirmPassword(confirmPassword);
    }, [password, confirmPassword]);

    // 필드 유효성 검사
    const isUsernameValid = Object.values(usernameValid).every(Boolean);
    const isnameValid = Object.values(nameValid).every(Boolean);
    const isEmailValidField = Object.values(emailValid).every(Boolean);
    const isPasswordValidField = Object.values(passwordValid).every(Boolean);
    const isConfirmPasswordValidField = Object.values(confirmPasswordValid).every(Boolean);
    const isCarrierValid = carrier !== '';
    const isPhoneValid = /^\d{11}$/.test(phone);
    const isBirthdateValid = birthdate !== "";

    // 전체 폼 유효성 검사
    const isFormValid =
        isUsernameValid &&
        isnameValid &&
        isEmailValidField &&
        isPasswordValidField &&
        isConfirmPasswordValidField &&
        isCarrierValid &&
        isPhoneValid &&
        isBirthdateValid;

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            try {
                // 요청 페이로드 준비
                const payload = {
                    id: username,
                    name: name,
                    email: email,
                    birthdate: birthdate,
                    password: password,
                    carrier: carrier,
                    phone: phone,
                };

                // 백엔드 API 엔드포인트에 POST 요청
                const response = await axios.post('/users/join', payload);

                if (response.status === 201) {
                    setMessage('회원가입이 완료되었습니다!');
                    // 로그인 페이지로 리디렉션
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000); // 2초 후 이동
                }
            } catch (error) {
                console.error('회원가입 에러:', error);
                if (error.response && error.response.data) {
                    setMessage(`에러: ${error.response.data.statusMessage}`);
                } else {
                    setMessage('회원가입 중 문제가 발생했습니다.');
                }
            }
        } else {
            setMessage('모든 필드를 정확하게 입력해주세요.');
        }
    };

    // 뒤로가기 핸들러
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="join__modal">
            <div className="join__container">
                {/* 로고 이미지 및 제목과 뒤로가기 버튼 */}
                <div className="join__logo-title">
                    <img
                        src="../images/join/join-login-datainc_icon.svg"
                        alt="데이터잉크 로고"
                        className="join__logo"
                    />
                    <span className="join__title">DataInk</span>
                    <button className="join__back-button" onClick={handleBack} aria-label="뒤로가기">
                        <img
                            src="../images/join/join-tothelogin(back)_icon.svg"
                            alt="뒤로가기 아이콘"
                        />
                    </button>
                </div>

                {/* 회원가입 제목 */}
                <div className="join__signup-title">
                    <h1>회원가입</h1>
                    <p>DataInk의 회원이 되실 수 있습니다.</p>
                </div>

                {/* 회원가입 폼 */}
                <form className="join__form" onSubmit={handleSubmit}>
                    {/* 아이디 필드 */}
                    <div className={`join__form-group ${focusedField === 'username' ? 'active' : ''}`}>
                        <label htmlFor="username">
                            <span className="join__required">*</span>아이디
                        </label>
                        <div className="join__input-wrapper">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="아이디를 입력하세요"
                                aria-label="아이디 입력"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setFocusedField('username')}
                                onBlur={() => setFocusedField('')}
                                className={isUsernameValid ? 'valid' : ''}
                                required
                            />
                            {isUsernameValid && (
                                <img
                                    src="../images/join/join-check_icon.svg"
                                    alt="체크 아이콘"
                                    className="join__input-icon visible"
                                />
                            )}
                        </div>
                    </div>

                    {/* 부가 설명 메시지 - 아이디 */}
                    <div className={`join__validation-messages ${focusedField === 'username' && !isUsernameValid ? 'visible' : ''}`}>
                        <p className={usernameValid.lettersAndNumbersOnly ? 'valid' : 'invalid'}>
                            영문자와 숫자의 조합만 사용 가능합니다.
                        </p>
                        <p className={usernameValid.minLength ? 'valid' : 'invalid'}>
                            6글자 이상이어야 합니다.
                        </p>
                        <p className={usernameValid.hasNumber ? 'valid' : 'invalid'}>
                            숫자를 하나 이상 조합해주세요.
                        </p>
                    </div>

                    {/* 실명 필드 */}
                    <div className={`join__form-group ${focusedField === 'name' ? 'active' : ''}`}>
                        <label htmlFor="ame">
                            <span className="join__required">*</span>이름
                        </label>
                        <div className="join__input-wrapper">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="성함을 입력하세요"
                                aria-label="성함 입력"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField('')}
                                className={isnameValid ? 'valid' : ''}
                                required
                            />
                            {isnameValid && (
                                <img
                                    src="../images/join/join-check_icon.svg"
                                    alt="체크 아이콘"
                                    className="join__input-icon visible"
                                />
                            )}
                        </div>
                    </div>

                    {/* 부가 설명 메시지 - 실명 */}
                    <div className={`join__validation-messages ${focusedField === 'name' && !isnameValid ? 'visible' : ''}`}>
                        <p className={nameValid.notEmpty ? 'valid' : 'invalid'}>
                            성함을 입력해주세요.
                        </p>
                        <p className={nameValid.isValidFormat ? 'valid' : 'invalid'}>
                            한글과 공백만 사용 가능합니다.
                        </p>
                    </div>

                    {/* 이메일 필드 */}
                    <div className={`join__form-group ${focusedField === 'email' ? 'active' : ''}`}>
                        <label htmlFor="email">
                            <span className="join__required">*</span>이메일
                        </label>
                        <div className="join__input-wrapper">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="이메일을 입력하세요"
                                aria-label="이메일 입력"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField('')}
                                className={isEmailValidField ? 'valid' : ''}
                                required
                            />
                            {isEmailValidField && (
                                <img
                                    src="../images/join/join-check_icon.svg"
                                    alt="체크 아이콘"
                                    className="join__input-icon visible"
                                />
                            )}
                        </div>
                    </div>

                    {/* 부가 설명 메시지 - 이메일 */}
                    <div className={`join__validation-messages ${focusedField === 'email' && !isEmailValidField ? 'visible' : ''}`}>
                        <p className={emailValid.format ? 'valid' : 'invalid'}>
                            유효한 이메일 양식을 적어주세요.
                        </p>
                    </div>

                    {/* 생년월일 필드 */}
                    <div className={`join__form-group ${focusedField === 'birthdate' ? 'active' : ''}`}>
                        <label htmlFor="birthdate">
                            <span className="join__required">*</span>생년월일
                        </label>
                        <div className="join__input-wrapper join__date-input">
                            <input
                                type="date"
                                id="birthdate"
                                name="birthdate"
                                aria-label="생년월일 입력"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                onFocus={() => setFocusedField('birthdate')}
                                onBlur={() => setFocusedField('')}
                                className={isBirthdateValid ? 'valid' : ''}
                                required
                            />
                            {isBirthdateValid && (
                                <img
                                    src="../images/join/join-check_icon.svg"
                                    alt="체크 아이콘"
                                    className="join__input-icon visible"
                                />
                            )}
                        </div>
                    </div>

                    {/* 부가 설명 메시지 - 생년월일 */}
                    <div className={`join__validation-messages ${focusedField === 'birthdate' && !isBirthdateValid ? 'visible' : ''}`}>
                        <p className={isBirthdateValid ? 'valid' : 'invalid'}>
                            생년월일을 선택해주세요.
                        </p>
                    </div>

                    {/* 비밀번호 필드 */}
                    <div className={`join__form-group ${focusedField === 'password' ? 'active' : ''}`}>
                        <label htmlFor="password">
                            <span className="join__required">*</span>비밀번호
                        </label>
                        <div className="join__input-wrapper">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="비밀번호를 입력하세요"
                                aria-label="비밀번호 입력"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField('')}
                                className={isPasswordValidField ? 'valid' : ''}
                                required
                            />
                            {isPasswordValidField && (
                                <img
                                    src="../images/join/join-check_icon.svg"
                                    alt="체크 아이콘"
                                    className="join__input-icon visible"
                                />
                            )}
                        </div>
                    </div>

                    {/* 부가 설명 메시지 - 비밀번호 */}
                    <div className={`join__validation-messages ${focusedField === 'password' && !isPasswordValidField ? 'visible' : ''}`}>
                        <p className={passwordValid.hasSpecialChar ? 'valid' : 'invalid'}>
                            특수문자를 하나 이상 포함해주세요.
                        </p>
                        <p className={passwordValid.hasUppercase ? 'valid' : 'invalid'}>
                            대문자를 하나 이상 포함해주세요.
                        </p>
                        <p className={passwordValid.hasLowercase ? 'valid' : 'invalid'}>
                            소문자를 하나 이상 포함해주세요.
                        </p>
                        <p className={passwordValid.hasNumber ? 'valid' : 'invalid'}>
                            숫자를 하나 이상 포함해주세요.
                        </p>
                    </div>

                    {/* 비밀번호 확인 필드 */}
                    <div className={`join__form-group ${focusedField === 'confirmPassword' ? 'active' : ''}`}>
                        <label htmlFor="confirm-password">
                            <span className="join__required">*</span>비밀번호확인
                        </label>
                        <div className="join__input-wrapper">
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="비밀번호를 재입력해주세요"
                                aria-label="비밀번호 확인 입력"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField('')}
                                className={isConfirmPasswordValidField ? 'valid' : ''}
                                required
                            />
                            {isConfirmPasswordValidField && (
                                <img
                                    src="../images/join/join-check_icon.svg"
                                    alt="체크 아이콘"
                                    className="join__input-icon visible"
                                />
                            )}
                        </div>
                    </div>

                    {/* 부가 설명 메시지 - 비밀번호 확인 */}
                    <div className={`join__validation-messages ${focusedField === 'confirmPassword' && !isConfirmPasswordValidField ? 'visible' : ''}`}>
                        <p className={confirmPasswordValid.matches ? 'valid' : 'invalid'}>
                            비밀번호와 일치시켜주세요.
                        </p>
                    </div>

                    {/* 통신사 필드 */}
                    <div className={`join__form-group ${focusedField === 'carrier' ? 'active' : ''}`}>
                        <label htmlFor="carrier">
                            <span className="join__required">*</span>통신사
                        </label>
                        <div className="join__input-wrapper">
                            <select
                                id="carrier"
                                name="carrier"
                                aria-label="통신사 선택"
                                value={carrier}
                                onChange={(e) => setCarrier(e.target.value)}
                                onFocus={() => setFocusedField('carrier')}
                                onBlur={() => setFocusedField('')}
                                className={isCarrierValid ? 'valid' : ''}
                                required
                            >
                                <option value="">통신사를 선택해주세요</option>
                                <option value="SK">SK</option>
                                <option value="KT">KT</option>
                                <option value="LG">LG</option>
                                <option value="SK알뜰">SK알뜰</option>
                                <option value="KT알뜰">KT알뜰</option>
                                <option value="LG알뜰">LG알뜰</option>
                            </select>
                            {isCarrierValid && (
                                <img
                                    src="../images/join/join-check_icon.svg"
                                    alt="체크 아이콘"
                                    className="join__input-icon visible"
                                />
                            )}
                        </div>
                    </div>

                    {/* 부가 설명 메시지 - 통신사 */}
                    <div className={`join__validation-messages ${focusedField === 'carrier' && !isCarrierValid ? 'visible' : ''}`}>
                        <p className={isCarrierValid ? 'valid' : 'invalid'}>
                            통신사를 클릭해주세요.
                        </p>
                    </div>

                    {/* 전화번호 필드 */}
                    <div className={`join__form-group ${focusedField === 'phone' ? 'active' : ''}`}>
                        <label htmlFor="phone">
                            <span className="join__required">*</span>전화번호
                        </label>
                        <div className="join__input-wrapper">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="전화번호를 입력하세요"
                                aria-label="전화번호 입력"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField('')}
                                className={isPhoneValid ? 'valid' : ''}
                                required
                            />
                            {isPhoneValid && (
                                <img
                                    src="../images/join/join-check_icon.svg"
                                    alt="체크 아이콘"
                                    className="join__input-icon visible"
                                />
                            )}
                        </div>
                    </div>

                    {/* 부가 설명 메시지 - 전화번호 */}
                    <div className={`join__validation-messages ${focusedField === 'phone' && !isPhoneValid ? 'visible' : ''}`}>
                        <p className={isPhoneValid ? 'valid' : 'invalid'}>
                            올바른 양식으로 입력해주세요 (총 11자 짜리 숫자).
                        </p>
                    </div>

                    {/* 제출 버튼 */}
                    <div className="join__submit-button">
                        <button type="submit" disabled={!isFormValid}>
                            회원가입
                        </button>
                    </div>
                </form>

                {/* 메시지 표시 */}
                {message && <p className="join__message">{message}</p>}
            </div>
        </div>
    );

};

export default Join;
