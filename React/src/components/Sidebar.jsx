import React, { useState } from 'react';
import '../css/sidebar.css'; // CSS 파일 연결
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // extra-sidebar의 열림 상태 관리

  // 마우스를 올리면 extra-sidebar가 열림
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  // 마우스가 사이드바와 extra-sidebar 모두 벗어나면 닫힘
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className="sidebar-container" // 사이드바와 extra-sidebar를 감싸는 컨테이너
      onMouseEnter={openSidebar} // 마우스를 올리면 열림
      onMouseLeave={closeSidebar} // 마우스를 벗어나면 닫힘
    >
      {/* 고정 사이드바 */}
      <aside className="sidebar">
        <img className="sidebar__logo" src="/icons/dataink-logo_icon.svg" alt="데이터잉크 아이콘" />
        <div className="sidebar__menu">
          <a href="/main" className="sidebar__icon sidebar__icon--active">
            <img src="/icons/main-home_icon.svg" alt="메인홈" />
          </a>
          <a href="/data" className="sidebar__icon">
            <img src="/icons/data_icon.svg" alt="데이터라벨링" />
          </a>
          <a href="/member" className="sidebar__icon">
            <img src="/icons/member_icon.svg" alt="멤버관리" />
          </a>
          <a href="/" className="sidebar__icon">
            <img src="/icons/notice_icon.svg" alt="공지사항" />
          </a>
        </div>
      </aside>

      {/* extra-sidebar */}
      <aside className={`extra-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="extra-sidebar__menu">
              <Link to="/dashboard" className="extra-sidebar__link">대시보드(Home)</Link>
              <Link to="/label" className="extra-sidebar__link">데이터라벨링</Link>
              <Link to="/member" className="extra-sidebar__link">멤버관리</Link>
              <Link to="/notice" className="extra-sidebar__link">공지사항</Link>
          </div>
      </aside>
    </div>
  );
}

export default Sidebar;
