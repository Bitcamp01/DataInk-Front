import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../css/main.css';
import Header from '../components/Header';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Data Labeling');

  // 페이지 제목을 설정하는 함수
  const getPageTitle = (path) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/label/main':
        return 'Labelling Select';
      case '/label/work':
        return 'Labelling Work';
      case '/label/detail':
        return 'Labelling Detail';
      case '/member':
        return 'Member Management';
      case '/mypage':
        return 'MyPage';
      case '/notice':
        return 'Notice';
      case '/review':
        return 'Labelling Review';
      case '/notice_write':
        return 'Notice';
      case '/notice_detail':
        return 'Notice';
      default:
        return 'Data Labeling'; // 기본 제목
    }
  };

  useEffect(() => {
    const title = getPageTitle(location.pathname);
    setPageTitle(title);
  }, [location]);


  return (
    <div className="layout">
      {/* 사이드바 */}
      <Sidebar />
      
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