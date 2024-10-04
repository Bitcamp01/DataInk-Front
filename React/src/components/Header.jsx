import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';

function Header() {
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    // 알림 외의 영역 클릭 시 알림 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!document.querySelector('.header__icon-wrapper').contains(event.target)) {
                setShowNotifications(false);
            }
        };

        // 이벤트 리스너 추가
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            document.removeEventListener('mousedown', handleClickOutside);
        }; 
    }, []);

    // "뒤로가기" 버튼 클릭 시 이전 페이지로 이동
    const handleBackClick = () => {
      navigate(-1); // 뒤로가기
  };

    // "더 보기" 클릭 시 알림창 닫기 및 페이지 이동
    const handleMoreClick = () => {
        setShowNotifications(false); // 알림창 닫기
        navigate('/mypage'); // 페이지 이동
    };

    // 프로필 클릭 시 마이페이지 이동
    const handleProfileClick = () => {
        navigate('/mypage'); // 페이지 이동
    };

    return (
        <header className="header">
            <div className="header__back-icon" onClick={handleBackClick}>
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
                        onClick={toggleNotifications} 
                    />
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
                <img src="/images/profile_img.png" alt="프로필" onClick={handleProfileClick} className="header__icon header__icon--profile" />
                <img src="/icons/profile-drop_icon.svg" alt="드롭다운" className="header__icon header__icon--dropdown" />
            </div>
        </header>
    );
}

export default Header;
