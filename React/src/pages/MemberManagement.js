import React, { useState, useEffect } from 'react'; 
import '../css/memberManagement.css';
import FixedSizeGrid from '../components/Table_memberListAll'; 
import Table_projectList from '../components/Table_projectList';
import Modal_addMember from '../components/Modal_addMember';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTabData } from '../apis/memberManagementApis';

const MemberManagement = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [open, setOpen] = useState(false); // 모달 상태 관리
  const [email, setEmail] = useState('');  // 이메일 입력 상태
  const [page, setPage] = useState(1); // 페이지 상태
  
  const dispatch = useDispatch();

  // // Redux 상태를 가져오기
  // const {  data = [], totalPages, loading, error } = useSelector((state) => state.memberManagement || {});


  // 탭 전환 시 데이터를 가져오기 위해 useEffect 사용
  useEffect(() => {
    dispatch(fetchTabData({ tab:activeTab, page}));
  }, [activeTab, page, dispatch]); // activeTab이나 page가 변경될 때마다 호출


  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
      setPage(value);
  };

  // 탭 변경 함수
  const handleTabClick = (tabName) => {
    console.log("Tab 변경됨, tabName:", tabName); // 로그 추가
    setActiveTab(tabName);
    setPage(1); // 탭이 변경될 때 페이지를 초기화
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
              {activeTab === 'users'?'전체 멤버 리스트' :'프로젝트 별 멤버 관리'}
            </div>
            <div className="member-list__discription">
              {activeTab === 'users'? (
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
                className={`tab-section__tab ${activeTab === 'users' ? 'tab-section__tab--active' : ''}`}
                onClick={() => handleTabClick('users')}>
                멤버 리스트
              </button>
             
              {/* 프로젝트 관리 탭 */}
              <button
                className={`tab-section__tab ${activeTab === 'projects' ? 'tab-section__tab--active' : ''}`}
                onClick={() => handleTabClick('projects')}>
                프로젝트 관리
              </button>
            
              </div>
              {/* 멤버 추가 버튼: activeTab이 'users'일 때만 보이게 */}
              {activeTab === 'users' && (
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
            {activeTab === 'users' ?  <FixedSizeGrid  /> :
            <Table_projectList />}
            </div>

            

          {/* 멤버 추가 모달창 */}
          <Modal_addMember open={open} handleClose={handleClose} email={email} setEmail={setEmail} />

        </section>
      </>
  );
}

export default MemberManagement;