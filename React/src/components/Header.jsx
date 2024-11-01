import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../apis/userApis';
import { fetchLatest } from '../apis/notificationApis';

function Header({ title }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false); // 프로필 메뉴 토글 상태
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 초기 렌더링 시 알림 가져오기
    useEffect(() => {
        dispatch(fetchLatest());
    }, [dispatch]);

    // Redux에서 알림 목록과 사용자 프로필 이미지 URL 가져오기
    const notifications = useSelector((state) => state.notificationSlice.items);
    const profileImageUrlDB = useSelector((state) => state.userSlice.profileImageUrl);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    // 알림 외의 영역 클릭 시 알림 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!document.querySelector('.header__icon-wrapper').contains(event.target)) {
                setShowNotifications(false);
            }
            if (!document.querySelector('.header__profile-wrapper').contains(event.target)) {
                setShowProfileMenu(false); // 프로필 메뉴도 외부 클릭 시 닫기
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
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
        navigate('/mypage?section=Alarm'); // 페이지 이동
    };

    // 프로필 메뉴에서 선택 시 이동 처리
    const handleProfileSelect = (option) => {
        setShowProfileMenu(false); // 프로필 메뉴 닫기
        if (option === 'mypage') {
            navigate('/mypage'); // 마이페이지로 이동
        } else if (option === 'mytasks') {
            navigate('/mypage?section=Calendar'); // 내 작업으로 이동 (쿼리 파라미터로 구분)
        } else if (option === 'logout') {
            dispatch(logout());
            navigate('/login');
        }
    };

    // 시간 경과 계산 유틸리티 함수
    const timeAgo = (timestamp) => {
        const now = new Date();
        const diff = Math.floor((now - new Date(timestamp)) / 1000);
        if (diff < 60) return `${diff}초 전`;
        const minutes = Math.floor(diff / 60);
        if (minutes < 60) return `${minutes}분 전`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}시간 전`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}일 전`;
        const months = Math.floor(days / 30);
        return `${months}달 전`;
    };

    const profileImageUrl = profileImageUrlDB 
    ? `https://kr.object.ncloudstorage.com/dataink/${profileImageUrlDB}`
    : '/images/dataInk_profile_default.png';  // 기본값으로 설정

    return (
        <header className="header">
            <div className="header__back-icon" onClick={handleBackClick}>
                <img src="/icons/back_icon.svg" alt="뒤로가기" />
            </div>
            <div className="header__title">{title}</div>
            <div className="header__icons">
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
                                {notifications.map((notification) => (
                                    <div className="notification-item" key={notification.id}>
                                        <img
                                            src={notification.profile_image_url 
                                                ? `https://kr.object.ncloudstorage.com/dataink/${notification.profile_image_url}`
                                                : '/images/dataInk_profile_default.png'}
                                            alt="프로필"
                                            className="notification-item__profile"
                                        />
                                        <div className="notification-item__content">
                                            <p>{notification.content}</p>
                                            <small>{timeAgo(notification.timestamp)}</small>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => navigate('/mypage?section=Alarm')} className="notification-dropdown__more">
                                    더 보기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="header__profile-wrapper">
                    <img src={profileImageUrl} alt="프로필" onClick={toggleProfileMenu} className="header__icon header__icon--profile" />
                    <img src="/icons/profile-drop_icon.svg" alt="드롭다운" className="header__icon header__icon--dropdown" onClick={toggleProfileMenu} />
                    {showProfileMenu && (
                        <div className="profile-dropdown">
                            <div className="profile-dropdown__header">프로필 옵션</div>
                            <div className="profile-dropdown__content">
                                <div onClick={() => handleProfileSelect('mypage')} className="profile-dropdown__item">마이페이지</div>
                                <div onClick={() => handleProfileSelect('mytasks')} className="profile-dropdown__item">내 일정</div>
                                <div onClick={() => handleProfileSelect('logout')} className="profile-dropdown__item">로그아웃</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
