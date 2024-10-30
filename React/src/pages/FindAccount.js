// src/components/FindAccount.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/findAccount.css';

const FindAccount = () => {
    // 상태 관리
    const [activeTab, setActiveTab] = useState('findId');

    // 포커스 상태 관리
    const [focusedField, setFocusedField] = useState('');

    // 입력 필드 상태
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [username, setUsername] = useState('');

    // 뒤로가기 핸들러
    const handleBack = () => {
        window.history.back();
    };

    // 탭 클릭 핸들러
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // 입력 필드 초기화
        setEmail('');
        setBirthdate('');
        setUsername('');
    };

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'findId') {
            // 아이디 찾기 로직
            alert('입력하신 정보로 아이디를 찾습니다.');
        } else {
            // 비밀번호 찾기 로직
            alert('입력하신 정보로 비밀번호를 찾습니다.');
        }
    };

    return (
        <div className="find__modal">
            {/* 탭 메뉴를 find-container 바깥으로 이동 */}
            <div className="find__tab-menu">
                <button
                    className={activeTab === 'findId' ? 'find__tab active' : 'find__tab'}
                    onClick={() => handleTabClick('findId')}
                >
                    아이디 찾기
                </button>
                <button
                    className={activeTab === 'findPw' ? 'find__tab active' : 'find__tab'}
                    onClick={() => handleTabClick('findPw')}
                >
                    비밀번호 찾기
                </button>
            </div>

            <div className="find__container">
                {/* 로고 이미지 및 제목과 뒤로가기 버튼 */}
                <div className="find__logo-title">
                    <img
                        src="../images/join/join-login-datainc_icon.svg"
                        alt="데이터잉크 로고"
                        className="find__logo"
                    />
                    <span className="find__title">DataInk</span>
                    <button className="find__back-button" onClick={handleBack} aria-label="뒤로가기">
                        <img
                            src="../images/join/join-tothelogin(back)_icon.svg"
                            alt="뒤로가기 아이콘"
                        />
                    </button>
                </div>

                {/* 아이디/비밀번호 찾기 제목 */}
                <div className="find__title-section">
                    <h1>{activeTab === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}</h1>
                    <p>DataInk의 회원 {activeTab === 'findId' ? '아이디' : '비밀번호'}를 찾을 수 있습니다.</p>
                </div>

                {/* 폼 내용 */}
                <form className="find__form" onSubmit={handleSubmit}>
                    {activeTab === 'findId' ? (
                        <>
                            {/* 이메일 필드 */}
                            <div className={`find__form-group ${focusedField === 'email' ? 'active' : ''}`}>
                                <label htmlFor="email">
                                    <span className="find__required">*</span>이메일
                                </label>
                                <div className="find__input-wrapper">
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
                                    />
                                </div>
                            </div>

                            {/* 생년월일 필드 */}
                            <div className={`find__form-group ${focusedField === 'birthdate' ? 'active' : ''}`}>
                                <label htmlFor="birthdate">
                                    <span className="find__required">*</span>생년월일
                                </label>
                                <div className="find__input-wrapper find__date-input">
                                    <input
                                        type="date"
                                        id="birthdate"
                                        name="birthdate"
                                        aria-label="생년월일 입력"
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        onFocus={() => setFocusedField('birthdate')}
                                        onBlur={() => setFocusedField('')}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* 아이디 필드 */}
                            <div className={`find__form-group ${focusedField === 'username' ? 'active' : ''}`}>
                                <label htmlFor="username">
                                    <span className="find__required">*</span>아이디
                                </label>
                                <div className="find__input-wrapper">
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
                                    />
                                </div>
                            </div>

                            {/* 이메일 필드 */}
                            <div className={`find__form-group ${focusedField === 'email' ? 'active' : ''}`}>
                                <label htmlFor="email">
                                    <span className="find__required">*</span>이메일
                                </label>
                                <div className="find__input-wrapper">
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
                                    />
                                </div>
                            </div>

                            {/* 생년월일 필드 */}
                            <div className={`find__form-group ${focusedField === 'birthdate' ? 'active' : ''}`}>
                                <label htmlFor="birthdate">
                                    <span className="find__required">*</span>생년월일
                                </label>
                                <div className="find__input-wrapper find__date-input">
                                    <input
                                        type="date"
                                        id="birthdate"
                                        name="birthdate"
                                        aria-label="생년월일 입력"
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        onFocus={() => setFocusedField('birthdate')}
                                        onBlur={() => setFocusedField('')}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* 제출 버튼 */}
                    <div className="find__submit-button">
                        <button type="submit">
                            {activeTab === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FindAccount;
