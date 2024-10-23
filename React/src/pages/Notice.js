import React from 'react';
import { useState } from 'react';
import '../css/memberManagement.css';
import Table_Notice from '../components/Table_notice';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
          <div className='table-container'>
          <Table_Notice />
          </div>

        
          {/* 멤버 추가 버튼: activeTab이 'member'일 때만 보이게 */}   
          <div className="write-btn-container"  >
            <button 
            className="member-list__write-btn" 
            style={{ float: 'right' }}
            onClick={handleButtonClick}>글 쓰기</button>
          </div>

          {/* 페이지네이션 */}
          <div className="pagination-container">
            <Stack spacing={2} sx={{ marginBottom: '80px',  }}>
                <Pagination count={10}  sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#7c97fe', // 기본 페이지 버튼의 색상
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#7c97fe', // 선택된 페이지 속성
                    color: '#ffffff', 
                  },
                  '& .MuiPaginationItem-root:not(.Mui-selected)': {
                    color: '#3e3e3e', // 선택되지 않은 페이지 텍스트 색상 설정 (예: 검은색)
                  },
                  '& .MuiPaginationItem-ellipsis': {
                    color: '#3e3e3e', // 페이지 사이의 점 색상
                  },
                
                }} />
            </Stack>
          </div>
        </section>
      </>
  );
}

export default Notice;