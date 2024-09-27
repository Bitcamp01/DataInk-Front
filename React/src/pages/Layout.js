import React from 'react';
import Sidebar from '../components/Sidebar';
import '../css/main.css';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="layout">
      {/* 사이드바 */}
      <Sidebar />
      
      {/* 메인 영역 */}
      <div className="main">
        {/* 헤더 */}
        <Header />
        
        {/* Outlet을 사용해 각 페이지의 콘텐츠 렌더링 */}
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;