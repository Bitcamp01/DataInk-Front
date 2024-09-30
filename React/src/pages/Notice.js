import React from 'react';
import { useState } from 'react';
import '../css/memberManagement.css';
import FixedSizeGrid from '../components/Table_memberListAll'; 
import Table_projectList from '../components/Table_projectList';
import Table_Notice from '../components/Table_notice';

const MemberManagement = () => {
  const [activeTab, setActiveTab] = useState('member');

  // 탭 변경 함수
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
 
  return (
      <>
        {/* 콘텐츠 영역 */}
        <section className="member-list">
          <div className="member-list__title">
            공지 사항 게시판
            </div>
          <div className="member-list__discription">
             모든 작업에 관한 공지사항 관련 게시판입니다.<br/>
             멤버들과 필수적으로 공유해야 할 내용을 게시해주세요.             
          </div>

        {/* 테이블 영역 */} 
        <Table_Notice />
       
 

        </section>
      </>
  );
}

export default MemberManagement;