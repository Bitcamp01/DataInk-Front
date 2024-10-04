import React from 'react';
import { useState } from 'react';
import '../css/memberManagement.css';
import FixedSizeGrid from '../components/Table_memberListAll'; 
import Table_projectList from '../components/Table_projectList';
import Modal_addMember from '../components/Modal_addMember';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const MemberManagement = () => {
  const [activeTab, setActiveTab] = useState('member');
  const [open, setOpen] = useState(false); // 모달 상태 관리
  const [email, setEmail] = useState('');  // 이메일 입력 상태

  // 탭 변경 함수
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // 모달 열기
  const handleClickOpen = () => {
    setOpen(true);
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
    setEmail('');  // 모달이 닫힐 때 이메일 입력 초기화
  };

  return (
      <>
        {/* 콘텐츠 영역 */}
        <section className="member-list">
            <div className="member-list__title">
              {activeTab === 'member'?'전체 멤버 리스트' :'프로젝트 별 멤버 관리'}
            </div>
            <div className="member-list__discription">
              {activeTab === 'member'? (
                <> 가입한 멤버들의 리스트를 확인하고<br />
                멤버추가 버튼을 이용하여 새로운 멤버를 등록할 수 있습니다
                </>
              ) : (
                <>해당 프로젝트에 멤버를 추가, 삭제하여 관리자는 프로젝트 별로 멤버들을 손쉽게 관리 할 수 있습니다.
                <br/>먼저, 관리할 프로젝트를 선택해주세요.
                </>
              )}
            
            </div>
        
          <div className="member-list__tab_and_button">
            <div className="tab-section__tabs">
              {/* 멤버 리스트 탭 */}
              <button
                className={`tab-section__tab ${activeTab === 'member' ? 'tab-section__tab--active' : ''}`}
                onClick={() => handleTabClick('member')}>
                멤버 리스트
              </button>
             
              {/* 프로젝트 관리 탭 */}
              <button
                className={`tab-section__tab ${activeTab === 'project' ? 'tab-section__tab--active' : ''}`}
                onClick={() => handleTabClick('project')}>
                프로젝트 관리
              </button>
            
              </div>
              {/* 멤버 추가 버튼: activeTab이 'member'일 때만 보이게 */}
              {activeTab === 'member' && (
                    <Button
                      variant="contained" 
                      onClick={handleClickOpen}
                      sx={{
                        width:'130px',
                        height:'42px',
                        marginBottom:'10px',
                        fontFamily: 'Pretendard', // 폰트 설정
                        backgroundColor: '#7C97FE', // 버튼 배경 색상
                        color: '#FFFFFF', // 버튼 텍스트 색상
                        '&:hover': { 
                          backgroundColor: '#6B88E6',
                        },
                      }}
                      
                    >
                      멤버 추가
                    </Button>
                  )}
          </div>


            {/* 테이블 영역 */}
            <div className='table-container'>
            {activeTab === 'member' ?  <FixedSizeGrid /> : <Table_projectList/>}
            </div>

            {/* 페이지네이션 */}
            <div className="pagination-container custom-pagination">
                <Stack spacing={2} sx={{ marginBottom: '80px',  }}>
                    <Pagination count={10}  sx={{
                      '& .MuiPaginationItem-root': {
                        color: '#7c97fe !important', // 기본 페이지 버튼의 색상
                      },
                      '& .Mui-selected': {
                        backgroundColor: '#7c97fe', // 선택된 페이지 속성
                        color: '#ffffff', 
                      },
                      '& .MuiPaginationItem-root:not(.Mui-selected)': {
                        color: '#3e3e3e', // 선택되지 않은 페이지 텍스트 색상 설정 
                      },
                      '& .MuiPaginationItem-ellipsis': {
                        color: '#3e3e3e', // 페이지 사이의 점 색상
                      },
                    
                    }} />
                </Stack>
            </div>


          {/* 멤버 추가 모달창 */}
          <Modal_addMember open={open} handleClose={handleClose} email={email} setEmail={setEmail} />

        </section>
      </>
  );
}

export default MemberManagement;