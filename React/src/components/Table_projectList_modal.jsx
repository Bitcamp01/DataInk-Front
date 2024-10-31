import React, { useState, useEffect, useRef, useCallback , handleSaveSuccess } from 'react'; 
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import DialogActions from '@mui/material/DialogActions'; 
import DialogContent from '@mui/material/DialogContent'; 
import Grid from '@mui/material/Grid'; 
import Button from '@mui/material/Button'; 
import Stack from '@mui/material/Stack';
import { fetchModalData } from '../apis/memberManagementApis';
import axios from 'axios';
import { fetchProjectMembers } from '../apis/memberManagementApis';
import { resetModalData } from '../slices/memberModalSlice';
import { useNavigate } from 'react-router-dom';

// 역할을 한국어로 변환하는 함수
const translateRole = (role) => {
  switch (role) {
    case 'ROLE_USER':
      return '라벨러';
    case 'ROLE_ADMIN':
      return '관리자';
    case 'ROLE_MANAGER':
      return '검수자';
    default:
      return role; // 변환할 내용이 없으면 원래의 역할을 반환
  }
};

const columns = [
  // {field: 'id', headerName :'유저id', width: 50},
  { field: 'name', headerName: '이름', width: 120, resizable: false  },
  { field: 'department', headerName: '소속(부서)', width: 150 },
  { field: 'role', headerName: '역할', width: 150},
];


export default function Table_projectList_Modal({ open, onClose, selectedRow , handleClose}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // 상태 정의 (useState)
  const [selectedLeftMemberIds, setSelectedLeftMemberIds] = useState([]); // 왼쪽에서 선택한 멤버
  const [selectedRightMembers, setSelectedRightMembers] = useState([]); // 오른쪽에서 선택한 멤버
  const [modalData, setModalData] = useState([]); // 왼쪽 그리드에 있는 멤버 (프로젝트에 아직참여하지 않은 멤버 )초기 멤버 소스 
  const [projectMembers, setProjectMembers] = useState([]); // 왼쪽그리드의 멤버 (오른쪽으로 이동하기위한)현재 선택가능한 멤버 
  const [tempProjectMembers, setTempProjectMembers] = useState([]); // 임시 저장용 오른쪽 그리드 멤버
  const [page, setPage] = useState(0); // 페이지 추적

  const allMembersDB = useSelector((state) => state.memberModalSlice.modalDatas); // 전체 맴버 가져오기
  const projectMembersDB = useSelector((state) => state.memberProjectSlice.projectMembers);

  // modalData = allMembersDB;
  
  // 각 DataGrid의 스크롤 컨테이너 참조
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);

  useEffect(() => {
    // projectMembersDB에 없는 멤버만 modalData에 저장
    const filteredMembers = allMembersDB.filter(
      (member) => !projectMembersDB.some((projectMember) => projectMember.id === member.id)
    );
    setModalData(filteredMembers);
  }, [allMembersDB, projectMembersDB]); // allMembersDB나 projectMembersDB가 변경될 때마다 실행



  // 모달이 열릴 때 초기 데이터 불러오기
  useEffect(() => {
    if (open) {
      if (selectedRow) {
        dispatch(fetchProjectMembers(selectedRow.id)); // 특정 프로젝트의 멤버 불러오기
        setPage(0);  // 페이지 초기화
        dispatch(fetchModalData(0));  // 첫 페이지 데이터 불러오기
      }
    }
  }, [open, selectedRow, dispatch]);


  //모달무한스크롤
  // const loadMoreUsers = async (page) => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/modal`, {
  //       params: { page, size: 15 },
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       const newUsers = response.data.pageItems.content;
  //       setModalData((prevData) => [...prevData, ...newUsers]); // 이전 데이터에 이어붙임
  //     }
  //   } catch (error) {
  //     console.error('사용자 목록을 가져오는 중 오류 발생:', error);
  //   }
  // };



  // Redux의 modalData가 변경될 때마다 usersData 업데이트
  useEffect(() => {
    console.log('Redux에서 가져온 modalData:', modalData);
    setProjectMembers([...modalData])
  }, [modalData]);

    // Redux의 modalData가 변경될 때마다 usersData 업데이트
    useEffect(() => {
        console.log('leftMembers:', projectMembersDB);
    setTempProjectMembers(
      projectMembersDB.map((member) => ({
        projectId: selectedRow?.id,
        userId: member.userId,
        name: member.name,
        department: member.userDetailDto?.dep || '부서 정보 없음',
        role: member.authen ? translateRole(member.authen) : '역할 정보 없음',
      }))
    );
    }, [projectMembersDB]);

  // // 첫 번째 DataGrid의 스크롤 이벤트 처리
  // const handleScroll1 = () => {
  //   if (!containerRef1.current) return;
  //   const { scrollTop, scrollHeight, clientHeight } = containerRef1.current;

  //   if (scrollHeight - scrollTop <= clientHeight + 50 ) { // 끝에서 30px 남았을 때
  //     setPage((prevPage) => {
  //       const newPage = prevPage + 1;
  //       loadMoreUsers(newPage); // 새로운 페이지 데이터 불러오기
  //       return newPage;
  //     });
  //   }
  // };

  // // 두 번째 DataGrid의 스크롤 이벤트 처리
  // const handleScroll2 = () => {
  //   if (!containerRef2.current) return;
  //   const { scrollTop, scrollHeight, clientHeight } = containerRef2.current;
  
  //   if (scrollHeight - scrollTop <= clientHeight + 30) { // 끝에서 30px 남았을 때
  //     setPage((prevPage) => {
  //       const newPage = prevPage + 1;
  //       loadMoreUsers(newPage); // 새로운 페이지 데이터 불러오기
  //       return newPage;
  //     });
  //   }
  // };

  // Dialog 컴포넌트
  <Dialog open={open} onClose={handleClose}>
    {/* 나머지 내용 */}

  </Dialog>

  // 멤버를 임시 상태에서 오른쪽 그리드로 추가
const handleAddMembers = () => {
  const newMembers = [];

  for (const selectedLeftMemberId of selectedLeftMemberIds) {
    // selectedLeftMemberId에서 userId 부분만 추출 (예: '28_3'에서 '28' 추출)
    const [userId] = selectedLeftMemberId.split('_');

    for (const [index, projectMember] of projectMembers.entries()) {

      if (projectMember.userId.toString() === userId) {

        const department = projectMember.userDetailDto?.dep || '부서 정보 없음';
        const role = projectMember.authen ? translateRole(projectMember.authen) : '역할 정보 없음';

        const newMember = {
          department,
          isBookmarked: false,
          projectId: selectedRow.id,
          role,
          userId: projectMember.userId,
          name: projectMember.name,
        };
        newMembers.push(newMember);
        projectMembers.splice(index, 1);
        break; // 해당 멤버를 찾으면 반복문 종료
      }
    }
  }

  setTempProjectMembers((prev) => [...prev, ...newMembers]); // 오른쪽 임시 그리드에 추가
  setProjectMembers([...projectMembers]); // 왼쪽 그리드에서 제거
  setSelectedLeftMemberIds([]); // 선택 초기화
};


  
  // 멤버를 임시 상태에서 왼쪽 그리드로 제거
  const handleRemoveMembers = () => {
    const remainingMembers = tempProjectMembers.filter(
      (member) => !selectedRightMembers.includes(member.userId)
    );
  
    const removedMembers = tempProjectMembers.filter((member) =>
      selectedRightMembers.includes(member.userId)
    );

    // 제거된 멤버의 역할 정보 확인
  console.log('제거된 멤버:', removedMembers); // 로그 추가

  // 제거된 멤버가 역할 정보를 포함하고 있는지 확인
  removedMembers.forEach((member) => {
    console.log(`UserId: ${member.userId}, Role: ${member.role}`); // 각 멤버의 UserId와 Role 출력
  });

  
    setProjectMembers((prev) => [...prev, ...removedMembers]); // 왼쪽 그리드에 추가
    setTempProjectMembers(remainingMembers); // 오른쪽 임시 그리드에서 제거
    setSelectedRightMembers([]); // 선택 초기화
  };

  // 저장 버튼을 눌렀을 때, 임시 상태의 데이터를 백엔드와 동기화
  const handleSaveChanges = async () => {
      // tempProjectMembers 배열이 비어 있는지 확인
      if (!tempProjectMembers.length) {
        console.error("tempProjectMembers 배열이 비어 있습니다.");
        alert("저장할 멤버 데이터가 없습니다.");
        return;
    }
   
      // 배열의 첫 번째 객체에 projectId가 있는지 확인
      const projectId = selectedRow?.id; // 상위 projectId에서 가져오기
      if (!projectId) {
          console.error("projectId가 정의되지 않았습니다.");
          alert("프로젝트 ID가 없습니다.");
          return;
      }

  console.log('tempProjectMembers:', tempProjectMembers);
  console.log('projectId:', tempProjectMembers[0]?.projectId);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    try{  

    // 요청할 데이터 구조 설정
    const projectMemberSaveRequests = {
      projectId:projectId,
      // projectId: tempProjectMembers[0].projectId, // 프로젝트 ID
      members: tempProjectMembers.map(member => ({
        userId: member.userId,
        projectId: projectId,
        name: member.name,
        department: member.department,
        role: member.role
      })) // 멤버 정보 배열
    };
   

    console.log('저장할 데이터:', projectMemberSaveRequests); 

    const response = await axios.post(
      `${API_BASE_URL}/member/modal-save/${projectId}`
      , projectMemberSaveRequests
      , {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
    });

    if(response.status === 200) {
      alert('사용자 저장 성공');
      setTempProjectMembers([...response.data]);//실제 상태로 업데이트
      window.location.href = '/member?tab=projects'; // 페이지 리로드
      onClose();
     }
    }catch(error){
      console.error('사용자 저장 중 오류 발생:', error);
      alert('사용자 저장 중 오류가 발생했습니다.');
    }
  };


  return (


  <Dialog open={open} onClose={onClose} 
    sx={{ '& .MuiDialog-paper': { 
      borderRadius:'10px',
      backgroundColor:'#f6f6f6', 
      maxWidth: '1400px' ,
      padding: '0px 50px 30px 50px'} }}>

       {/* 닫기버튼 */}
      <IconButton
          aria-label="close"
          onClick={onClose}  
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],  // X 버튼 색상
          }}
        >
          <CloseIcon />
      </IconButton>

      <DialogContent sx={{ overflow: 'hidden' }}>
        <Box className="your-parent-class" sx={{ width: '100%', padding: '20px',}} >
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <h2 style={{color:'#3e3e3e', marginTop:'30px'}}>전체 멤버</h2>
              <p style={{ marginBottom: '30px', marginTop: '15px', display: 'block', color:'#3e3e3e' }}>
                프로젝트에 참여시킬 멤버를 선택 후, 화살표 아이콘을 눌러 해당 프로젝트에 참여해주세요.</p>
              <Box
                ref={containerRef1}
                sx={{
                  height: '540px',
                  overflow: 'auto',  
                  border: 'transparent', 
                  minWidth: '200px',
                  width: '100%', 
                  maxWidth: '100%',
                  overflowY: 'auto', 
        
                }}
                // onScroll={handleScroll1} // 스크롤 이벤트 핸들러 등록
              >        
                
                      
              <DataGrid
                rows={(projectMembers).map((item, index) => ({
                  // id: item.userId,
                  id: `${item.userId}_${index}`,  // 고유한 id 설정 (userId와 index를 조합)
                  name: item.name,
                  department: item?.userDetailDto?.dep || '부서 정보 없음',
                  role:translateRole(item.authen),
                }))}
                columns={columns}
                checkboxSelection={true}
                editMode='row'
                disableSelectionOnClick={false}
                pagination={true} // 페이지네이션 활성화
                pageSize={10} // 한 페이지당 표시할 항목 수
                sx={{
                  height:'100%',
                  fontFamily:'Pretendard',
                  color:'#3e3e3e',
                  backgroundColor:'white', 
                  '& .MuiDataGrid-columnHeaders': {//컬럼 헤더의 폰트 설정               
                    color: '#7C97FE',  
                    fontWeight: 'bold',  
                  },
                  '& .MuiDataGrid-columnSeparator': {
                    display: 'none',  // 컬럼 헤더의 분리선 제거 
                  }, 
                  '& .MuiDataGrid-columnHeaderTitle': {
                    color: '#7c97fe', // 헤더 텍스트 색상을 변경
                  },
                
                }} 
                
                hideFooterPagination 
                hideFooter
                onRowSelectionModelChange={(newSelection) => {
                  setSelectedLeftMemberIds(newSelection);
                }}
                selectionModel={selectedLeftMemberIds}
              />
                </Box>
              
            </Grid>


            <Grid item xs={2} container alignItems="center" justifyContent="center" sx={{padding: '0px'}}>
            <Stack spacing={2} direction="column" alignItems="center" sx={{ marginTop: '100px' }}>
                  {/* 오른쪽 세모버튼 */}          
                  <Button
                    onClick={handleAddMembers}
                    sx={{
                      minWidth: 'auto',
                      padding: 0, // 패딩을 제거하여 이미지 크기만큼 버튼이 나타나게  
                      backgroundColor: 'transparent', // 버튼 배경색 제거
                      '&:hover': {
                        backgroundColor: 'transparent', // 호버 시 배경색 유지
                      },
                    }}
                  >
                    <img
                      src="../../icons/button_arrow_right_icon.svg" 
                      alt="왼쪽 화살표"
                      style={{
                        width: '40px',
                        height: '40px',
                      }}
                    />
                  </Button>
                     
                    
                  {/* 왼쪽 세모 버튼 */}
                  <Button
                    onClick={handleRemoveMembers}
                    sx={{
                      padding: 0,
                      minWidth: 'auto',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <img
                      src="/icons/button_arrow_left_icon.svg"  
                      alt="아래쪽 화살표"
                      style={{
                        width: '40px',
                        height: '40px',
                      }}
                    />
                  </Button>
                </Stack>
              </Grid>


            <Grid item xs={5}>
              <h2 style={{color:'#3e3e3e', marginTop: '30px'}}>프로젝트 참여 멤버</h2>
              <p style={{ marginBottom: '30px', marginTop: '15px', display: 'block', color:'#3e3e3e' }}>
                프로젝트에서 제외할 멤버를 선택 후, 화살표 아이콘을 눌러 해당 프로젝트에서 제외해주세요.</p>
                <Box 
                className="custom-scrollbar"
                ref={containerRef2}
                sx={{
                  height: '540px',
                  overflow: 'hidden',  
                  border: 'transparent',
                  minWidth: '200px',
                  width: '100%', 
                  maxWidth: '100%',
                  overflowY: 'auto', 
                  '&::-webkit-scrollbar': {
                    width: '8px',  // 스크롤바 너비 설정
                    height: '2px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#eef0f6',  // 스크롤 트랙 색상
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '10px', 
                    backgroundColor: '#7C97FE',  // 스크롤바 손잡이 색상
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#5A7ECF',  // 호버 시 손잡이 색상 변경
                  },  
                  '& .MuiDataGrid-columnHeaderTitle': {
                    color: '#7c97fe', // 헤더 텍스트 색상을 변경
                  },
                  
                }}
                // onScroll={handleScroll2} // 스크롤 이벤트 핸들러 등록
              >    
       
      
              <DataGrid
                rows={tempProjectMembers.map((item, index) => ({
                  id: item.userId,
                  name: item.name,
                  department: item.department || '부서 정보 없음',
                  role: item.role,
                }))}
                columns={columns}
                checkboxSelection
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{
                  height: '100%',
                  fontFamily:'Pretendard',
                  backgroundColor:'white',
                  borderRadius:'10px',
                  '& .MuiDataGrid-columnHeaders': {//컬럼 헤더의 폰트 설정               
                    color: '#7C97FE',  
                    fontWeight: 'bold',  
                  },
                  '& .MuiDataGrid-columnSeparator': {
                    display: 'none',  // 컬럼 헤더의 분리선 제거 
                  }, 
                }}
                hideFooter
                hideFooterPagination 
                onRowSelectionModelChange={(newSelection) => {
                  setSelectedRightMembers(newSelection);
                }}

              />
              </Box>
            </Grid>
          </Grid>
          
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained"  
        sx={{ margin: '20px 35px 5px 70px', 
        width:'130px', fontFamily:'Pretendard', 
        color: 'white',backgroundColor: '#7C97FE',
        '&:hover': { backgroundColor: '#5A7ECF' },
         }}
         onClick={handleSaveChanges}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}
