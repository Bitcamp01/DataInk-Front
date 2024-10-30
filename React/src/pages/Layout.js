import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../css/main.css';
import Header from '../components/Header';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Data Labeling');
  const [activeIcon, setActiveIcon] = useState('');

  // 페이지 제목과 activeIcon을 설정하는 함수
  const getPageInfo = (path) => {
    switch (path) {
      case '/dashboard':
        return { title: 'Dashboard', icon: 'dashboard' };
      case '/label/main':
        return { title: 'Labelling Select', icon: 'label' };
      case '/label/work':
        return { title: 'Labelling Work', icon: 'label' };
      case '/label/detail':
        return { title: 'Labelling Detail', icon: 'label' };
      case '/member':
        return { title: 'Member Management', icon: 'member' };
      case '/mypage':
        return { title: 'MyPage', icon: '' };
      case '/notice':
        return { title: 'Notice', icon: 'notice' };
      case '/review':
        return { title: 'Labelling Review', icon: 'label' };
      case '/notice_write':
        return { title: 'Notice', icon: 'notice' };
      case '/notice_detail':
        return { title: 'Notice', icon: 'notice' };
      default:
        return { title: 'Data Labeling', icon: '' };
    }
  };
  
  useEffect(() => {
    const { title, icon } = getPageInfo(location.pathname);
    setPageTitle(title);
    setActiveIcon(icon);
  }, [location]);


  return (
    <div className="layout">
      {/* 사이드바 */}
      <Sidebar activeIcon={activeIcon} />
      
      {/* 메인 영역 */}
      <div className="main">
        {/* 헤더 */}
        <Header title={pageTitle} />
        
        {/* Outlet을 사용해 각 페이지의 콘텐츠 렌더링 */}
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;