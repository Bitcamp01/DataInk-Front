import React from 'react';
import '../css/header.css'; // 헤더 전용 CSS 파일

function Header() {
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
          <img src="/icons/alert_icon.svg" alt="알람" className="header__icon header__icon--alert" />
          <img src="/images/profile_img.png" alt="프로필" className="header__icon header__icon--profile" />
          <img src="/icons/profile-drop_icon.svg" alt="드롭다운" className="header__icon header__icon--dropdown" />
        </div>
      </header>
    );
}

export default Header;
