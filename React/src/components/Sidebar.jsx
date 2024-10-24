import React, { useState } from 'react';
import '../css/sidebar.css'; // CSS 파일 연결
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // extra-sidebar의 열림 상태 관리
  // 현재 활성화된 아이콘 상태 관리
  const [activeIcon, setActiveIcon] = useState('');

  // 마우스가 아이콘 위로 올려졌을 때 활성화
  const handleMouseEnter = (iconName) => {
    setActiveIcon(iconName);
  };

  // 마우스가 아이콘에서 벗어났을 때 비활성화
  const handleMouseLeave = () => {
    setActiveIcon('');
  };

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
        <Link
          to="/dashboard"
          className={`sidebar__icon ${activeIcon === 'dashboard' ? 'sidebar__icon--active' : ''}`}
          onMouseEnter={() => handleMouseEnter('dashboard')}
          onMouseLeave={handleMouseLeave}
        >
          <img src="/icons/main-home_icon.svg" alt="메인홈" />
        </Link>
        <Link
          to="/label/main"
          className={`sidebar__icon ${activeIcon === 'label' ? 'sidebar__icon--active' : ''}`}
          onMouseEnter={() => handleMouseEnter('label')}
          onMouseLeave={handleMouseLeave}
        >
          <img src="/icons/data_icon.svg" alt="데이터라벨링" />
        </Link>
        <Link
          to="/member"
          className={`sidebar__icon ${activeIcon === 'member' ? 'sidebar__icon--active' : ''}`}
          onMouseEnter={() => handleMouseEnter('member')}
          onMouseLeave={handleMouseLeave}
        >
          <img src="/icons/member_icon.svg" alt="멤버관리" />
        </Link>
        <Link
          to="/notice"
          className={`sidebar__icon ${activeIcon === 'notice' ? 'sidebar__icon--active' : ''}`}
          onMouseEnter={() => handleMouseEnter('notice')}
          onMouseLeave={handleMouseLeave}
        >
          <img src="/icons/notice_icon.svg" alt="공지사항" />
        </Link>
      </div>
    </aside>

      {/* extra-sidebar */}
      <aside className={`extra-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="extra-sidebar__menu">
              <Link to="/dashboard" className="extra-sidebar__link">대시보드(Home)</Link>
              <Link to="/label/main" className="extra-sidebar__link">데이터라벨링</Link>
              <Link to="/member" className="extra-sidebar__link">멤버관리</Link>
              <Link to="/notice" className="extra-sidebar__link">공지사항</Link>
          </div>
      </aside>
    </div>
  );
}

export default Sidebar;
