import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import '../css/main.css';

function App() {
  return (
    <div className="layout">
      {/* 사이드바 */}
      <Sidebar />

      {/* 메인 영역 */}
      <div className="main">
        {/* 헤더 영역 */}
        <Header />
        
        {/* 콘텐츠 영역 */}
      </div>
    </div>
  );
}

export default App;
