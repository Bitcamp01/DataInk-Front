import React from 'react';
import '../css/memberManagement.css';
import FixedSizeGrid from './Table'; 
import Sidebar from './Sidebar'; 
import Header from './Header';


const MemberManagement = () => {
  return (
    <div className="layout">
      {/* 사이드바 */}
      <Sidebar/>

      {/* 메인(헤더 + 콘텐츠) 영역 */}
      <div className="main">
        {/* 헤더 영역 */}
       <Header/>

        {/* 콘텐츠 영역 */}
        <section className="member-list">
          <div className="member-list__title">전체 멤버 리스트</div>
          <div className="member-list__discription">
            가입한 멤버들의 리스트를 확인하고<br />
            멤버추가 버튼을 이용하여 새로운 멤버를 등록할 수 있습니다.
          </div>

          <div className="member-list__tab_and_button">
            <div className="tab-section__tabs">
              <button className="tab-section__tab tab-section__tab--active">멤버 리스트</button>
              <button className="tab-section__tab">프로젝트 관리</button>
            </div>
            <button className="member-list__add-btn">멤버 추가</button>
          </div>

        {/* 테이블 영역 */} 
        <FixedSizeGrid />

        </section>
      </div>
    </div>
  );
}

export default MemberManagement;