import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import '../css/header.css'; // 헤더 전용 CSS 파일

function Header() {
    const [showNotifications, setShowNotifications] = useState(false);
    const navi = useNavigate(); // 페이지 이동을 위한 설정

    // 알람 드롭다운 열고 닫기
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    // "more" 클릭 시 알람 페이지로 이동
    const handleMoreClick = () => {
       navi('/mypage'); // '/mypage' 라우트로 이동
    };

    return (
        <header className="header">
            <div className="header__back-icon">
                <img src="/icons/back_icon.svg" alt="뒤로가기" />
            </div>
            <div className="header__title">Data Labeling</div>
            <div className="header__search">
                <input type="text" className="header__search-input" />
                <img src="/icons/search_icon.svg" alt="검색 아이콘" className="header__search-icon" />
            </div>
            <div className="header__icons">
                <img src="/icons/chat_icon.svg" alt="채팅" className="header__icon header__icon--chat" />
                <div className="header__icon-wrapper">
                    <img 
                        src="/icons/alert_icon.svg" 
                        alt="알람" 
                        className="header__icon header__icon--alert" 
                        onClick={toggleNotifications} // 클릭 시 알람 드롭다운 토글
                    />
                    {/* 알람 드롭다운 */}
                    {showNotifications && (
                        <div className="notification-dropdown">
                            <div className="notification-dropdown__header">알림</div>
                            <div className="notification-dropdown__content">
                            <div className="notification-item">
                                <img src="/images/profile_img.png" alt="프로필" className="notification-item__profile" />
                                <div className="notification-item__content">
                                    <p>분류번호 002 작업에 배정되었습니다. 지금 바로 확인해보세요.</p>
                                    <small>방금 전</small>
                                </div>
                            </div>
                            <div className="notification-item">
                                <img src="/images/profile_img.png" alt="프로필" className="notification-item__profile" />
                                <div className="notification-item__content">
                                  <p>분류번호 001 작업 마감이 <strong>2일</strong> 남았습니다.</p>
                                  <small>2시간 전</small>
                                </div>
                            </div>
                            <button onClick={handleMoreClick} className="notification-dropdown__more">
                                더 보기
                            </button>
                          </div>
                        </div>
                    )}
                </div>
                <img src="/images/profile_img.png" alt="프로필" className="header__icon header__icon--profile" />
                <img src="/icons/profile-drop_icon.svg" alt="드롭다운" className="header__icon header__icon--dropdown" />
            </div>
        </header>
    );
}

export default Header;
