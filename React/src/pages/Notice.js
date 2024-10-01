import React from 'react';
import { useState } from 'react';
import '../css/memberManagement.css';
import FixedSizeGrid from '../components/Table_memberListAll'; 
import Table_projectList from '../components/Table_projectList';
import Table_Notice from '../components/Table_notice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { MdNotificationsNone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
  
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  
    const handleButtonClick = () => {
      navigate('/notice_write'); 
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

       
        {/* 멤버 추가 버튼: activeTab이 'member'일 때만 보이게 */}   
        <button 
        className="member-list__add-btn" 
        style={{ float: 'right' }}
        onClick={handleButtonClick}>글 쓰기</button>

        {/* 페이지네이션 */}
        <div className="pagination-container">
            <Stack spacing={2} sx={{ marginBottom: '80px', }}>
                <Pagination count={10} color="primary" />
            </Stack>
        </div>
        </section>
      </>
  );
}

export default Notice;