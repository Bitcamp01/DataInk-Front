import React, { useState, useEffect, useRef } from 'react'; 
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

const columns = [
  { field: 'id', headerName: '이름', width: 120, resizable: false  },
  { field: 'department', headerName: '소속(부서)', width: 150 },
  { field: 'role', headerName: '역할', width: 150},
];


export default function Table_projectList_Modal({ open, onClose, selectedRow , handleClose}) {
  const dispatch = useDispatch();

  // 상태 정의 (useState)
  const [selectedLeftMembers, setSelectedLeftMembers] = useState([]); // 왼쪽에서 선택한 멤버
  const [selectedRightMembers, setSelectedRightMembers] = useState([]); // 오른쪽에서 선택한 멤버
  const [projectMembers, setProjectMembers] = useState([]); // 오른쪽 그리드에 있는 멤버
  const [tempProjectMembers, setTempProjectMembers] = useState([]); // 임시 저장용 오른쪽 그리드 멤버
  const [usersData, setUsersData] = useState([]);
  const modalData = useSelector((state) => state.memberModalSlice.modalDatas); // Redux 상태 가져오기
  const [page, setPage] = useState(0); // 페이지 추적
  
  
  // 각 DataGrid의 스크롤 컨테이너 참조
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);

  // 모달이 열릴 때 초기 데이터 불러오기
  useEffect(() => {
    if (open) {
      setPage(0);  // 페이지 초기화
      dispatch(fetchModalData(0));  // 첫 페이지 데이터 불러오기
      setTempProjectMembers([...projectMembers]); // 현재 상태를 임시 상태에 복사
    }
  }, [open, projectMembers]);

  // Redux의 modalData가 변경될 때마다 usersData 업데이트
  useEffect(() => {
    console.log('Updated modalData:', modalData);
    setUsersData(modalData);
  }, [modalData]);

  // 첫 번째 DataGrid의 스크롤 이벤트 처리
  const handleScroll1 = () => {
    if (!containerRef1.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef1.current;

    if (scrollHeight - scrollTop <= clientHeight + 50 ) { // 끝에서 30px 남았을 때
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 두 번째 DataGrid의 스크롤 이벤트 처리
  const handleScroll2 = () => {
    if (!containerRef2.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef2.current;

    if (scrollHeight - scrollTop <= clientHeight + 30) { // 끝에서 30px 남았을 때
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 페이지가 변경될 때마다 데이터 추가 불러오기
  useEffect(() => {
    if (open && page > 0) {
      dispatch(fetchModalData({ page })); // 페이지 증가 시 데이터 요청
    }
  }, [page, open, dispatch]);

  // 첫 번째 DataGrid의 스크롤 이벤트 연결 및 해제
  useEffect(() => {
    if (open && containerRef1.current) {
      const container = containerRef1.current;
      container.addEventListener('scroll', handleScroll1);

      return () => {
        container.removeEventListener('scroll', handleScroll1);
      };
    }
  }, [open]);

  // 두 번째 DataGrid의 스크롤 이벤트 연결 및 해제
  useEffect(() => {
    if (open && containerRef2.current) {
      const container = containerRef2.current;
      container.addEventListener('scroll', handleScroll2);

      return () => {
        container.removeEventListener('scroll', handleScroll2);
      };
    }
  }, [open]);

  
  
  
  // Dialog 컴포넌트
  <Dialog open={open} onClose={handleClose}>
    {/* 나머지 내용 */}
  </Dialog>
  // 멤버를 임시 상태에서 오른쪽 그리드로 추가
  const handleAddMembers = () => {
    console.log('selectedLeftMembers 상태 업데이트:', selectedLeftMembers);
    const newMembers = usersData.filter((member) => selectedLeftMembers.includes(member.id));
  
    const filteredNewMembers = newMembers.filter(
      (newMember) => !tempProjectMembers.some((projectMember) => projectMember.id === newMember.id)
    );

    console.log('Filtered New Members:', filteredNewMembers);
  
    setTempProjectMembers((prev) => [...prev, ...filteredNewMembers]); // 오른쪽 임시 그리드에 추가
    setUsersData((prev) => prev.filter((member) => !selectedLeftMembers.includes(member.id))); // 왼쪽 그리드에서 제거
    setSelectedLeftMembers([]); // 선택 초기화
  };
  
  // 멤버를 임시 상태에서 왼쪽 그리드로 제거
  const handleRemoveMembers = () => {
    const remainingMembers = tempProjectMembers.filter(
      (member) => !selectedRightMembers.includes(member.id)
    );
  
    const removedMembers = tempProjectMembers.filter((member) =>
      selectedRightMembers.includes(member.id)
    );
  
    setUsersData((prev) => [...prev, ...removedMembers]); // 왼쪽 그리드에 추가
    setTempProjectMembers(remainingMembers); // 오른쪽 임시 그리드에서 제거
    setSelectedRightMembers([]); // 선택 초기화
  };

  // 저장 버튼을 눌렀을 때, 임시 상태의 데이터를 백엔드와 동기화
  const handleSaveChanges = async () => {
    // 여기서 API 호출을 통해 추가/삭제 작업을 수행할 수 있습니다.
    
    // 예시:
    // for (let member of tempProjectMembers) {
    //   await addMember(member);
    // }

    // 현재 임시 상태를 실제 상태로 업데이트
    setProjectMembers([...tempProjectMembers]);
    onClose(); // 모달 닫기
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
                onScroll={handleScroll1} // 스크롤 이벤트 핸들러 등록
              >        
                
                      
              <DataGrid
                rows={(usersData).map((item) => ({
                  id: item.id,
                  name: item.name,
                  department: item.userDetailDto.dep || '부서 정보 없음',
                  role: item.authen,
                }))}
                columns={columns}
                checkboxSelection={true}
                editMode='row'
                disableSelectionOnClick={false}
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
                  console.log('선택된 멤버:', newSelection);
                  setSelectedLeftMembers(newSelection);
                }}
                selectionModel={selectedLeftMembers}
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
                onScroll={handleScroll2} // 스크롤 이벤트 핸들러 등록
              >    
       
              <DataGrid
                rows={tempProjectMembers.map((item) => ({
                  id: item.id,
                  name: item.name,
                  department: item.userDetailDto.dep || '부서 정보 없음',
                  role: item.authen,
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
                  console.log('선택된 멤버:', newSelection);
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
