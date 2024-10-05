import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';  
import CloseIcon from '@mui/icons-material/Close'; 
import '../css/scrollbar.css';

const columns = [
  { field: 'id', headerName: '이름', width: 120, resizable: false  },
  { field: 'department', headerName: '소속(부서)', width: 150 },
  { field: 'role', headerName: '역할', width: 150},
];

const allMembersRows = [
  { id: '김병주',  department: 'Ncloud', role: '관리자' },
  { id: '최수민',  department: 'AI Clova', role: '검수자' },
  { id: '서재환',  department: 'AI Clova', role: '라벨러' },
  { id: '오유빈',  department: 'AI Clova', role: '라벨러' },
  { id: '김시표',  department: 'AI Clova', role: '라벨러' },
  { id: '마태림',  department: 'AI Clova', role: '라벨러' },
  { id: '김화영',  department: 'AI Clova', role: '라벨러' },
  { id: '마태림',  department: 'AI Clova', role: '라벨러' },
  { id: '김화영',  department: 'AI Clova', role: '라벨러' },
  { id: '마태림',  department: 'AI Clova', role: '라벨러' },
  { id: '김화영',  department: 'AI Clova', role: '라벨러' },
  { id: '마태림',  department: 'AI Clova', role: '라벨러' },
  { id: '김화영',  department: 'AI Clova', role: '라벨러' },
  { id: '마태림',  department: 'AI Clova', role: '라벨러' },
  { id: '김화영',  department: 'AI Clova', role: '라벨러' },
  { id: '마태림',  department: 'AI Clova', role: '라벨러' },
  { id: '김화영',  department: 'AI Clova', role: '라벨러' },

];

export default function Table_projectList_Modal({ open, onClose, selectedRow , handleClose}) {
  const [selectedAllMembers, setSelectedAllMembers] = React.useState([]);
  const [projectMembers, setProjectMembers] = React.useState([]);

  //'전체 멤버'에서 선택된 멤버를 '프로젝트 참여 멤버'로 추가
  const handleAddMembers = () => {
    const newMembers = allMembersRows.filter((row) =>
      selectedAllMembers.includes(row.id) 
    );

    const filteredNewMembers = newMembers.filter(
      (newMember) => !projectMembers.some((projectMember) => projectMember.id === newMember.id)
    );

    setProjectMembers((prev) => [...prev, ...newMembers]);
    setSelectedAllMembers([]);
  };

  //'프로젝트 참여 멤버'에서 선택된 멤버 제거
  const handleRemoveMembers = () => {
    const remainingMembers = projectMembers.filter(
      (member) => !selectedAllMembers.includes(member.id)
    );
    setProjectMembers(remainingMembers);
    setSelectedAllMembers([]);
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
        <Box sx={{ width: '100%', padding: '20px',}} >
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <h2 style={{color:'#3e3e3e', marginTop:'30px'}}>전체 멤버</h2>
              <p style={{ marginBottom: '30px', marginTop: '15px', display: 'block', color:'#3e3e3e' }}>
                프로젝트에 참여시킬 멤버를 선택 후, 화살표 아이콘을 눌러 해당 프로젝트에 참여해주세요.</p>
              <Box
                sx={{
                  height: '540px',
                  overflow: 'hidden',  
                  border: 'transparent', 
                  minWidth: '200px',
                  width: '100%', 
                  maxWidth: '100%',
                  overflowY: 'auto', 
        
                }}
              >        
                
                      
              <DataGrid
                rows={allMembersRows}
                columns={columns}
                checkboxSelection
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
                onSelectionModelChange={(newSelection) => {
                  setSelectedAllMembers(newSelection);
                }}
                selectionModel={selectedAllMembers}
              />
                </Box>
              
            </Grid>


            <Grid item xs={2} container alignItems="center" justifyContent="center" sx={{padding: '0px'}}>
            <Stack spacing={2} direction="column" alignItems="center" sx={{ marginTop: '100px' }}>
                  {/* 오른쪽 세모버튼 */}          
                  <Button
                    onClick={() => console.log('위쪽 화살표 클릭됨')}
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
                    onClick={() => console.log('아래쪽 화살표 클릭됨')}
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
              >    
       
              <DataGrid
                rows={projectMembers}
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
                onSelectionModelChange={(newSelection) => {
                  setSelectedAllMembers(newSelection);
                }}
                selectionModel={selectedAllMembers}
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
        '&:hover': { backgroundColor: '#5A7ECF' } }}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}
