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

const columns = [
  { field: 'id', headerName: '이름', width: 90, resizable: false  },
  { field: 'department', headerName: '소속(부서)', width: 100 },
  { field: 'role', headerName: '역할', width: 80},
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

  const handleAddMembers = () => {
    const newMembers = allMembersRows.filter((row) =>
      selectedAllMembers.includes(row.id)
    );
    setProjectMembers((prev) => [...prev, ...newMembers]);
    setSelectedAllMembers([]);
  };

  const handleRemoveMembers = () => {
    const remainingMembers = projectMembers.filter(
      (member) => !selectedAllMembers.includes(member.id)
    );
    setProjectMembers(remainingMembers);
    setSelectedAllMembers([]);
  };

  return (
    <Dialog open={open} onClose={onClose}  sx={{ '& .MuiDialog-paper': { borderRadius:'10px',backgroundColor:'#f6f6f6', width: '80%', maxWidth: '1200px' ,padding: '0px 50px 30px 50px'} }}>
       <IconButton
            aria-label="close"
            onClick={handleClose}  // X 버튼을 클릭하면 모달 닫기
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
        <Box sx={{ width: '100%', padding: '20px', height:'100%' }} >
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <h2 style={{color:'#3e3e3e', marginTop:'30px'}}>전체 멤버</h2>
              <p style={{ marginBottom: '30px', marginTop: '15px', display: 'block', color:'#3e3e3e' }}>프로젝트에 참여시킬 멤버를 선택 후, 화살표 아이콘을 눌러 해당 프로젝트에 참여해주세요.</p>
              <Box
                sx={{
                  height: 700,
                  overflow: 'hidden',  
                  border: '0.2px solid #d2d2d2', 
                  borderRadius: '10px',  // 모서리 둥글게
                  backgroundColor: 'white',
                }}
              >        
                <Box
                  sx={{
                    height: '100%',  // 내부에서 스크롤을 적용
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                    width: '8px',  // 스크롤바 너비 설정
                    height: '2px',
                    backgroundColor: '#f0f0f0',  // 스크롤 트랙 색상 (배경색)
                    }
                  }}
                >
                      
              <DataGrid
                rows={allMembersRows}
                columns={columns}
                checkboxSelection
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{
                  fontFamily:'Pretendard',
                  color:'#3e3e3e',
                  backgroundColor:'white',     
                }}
                autoHeight
                hideFooterPagination 
                hideFooter
                onSelectionModelChange={(newSelection) => {
                  setSelectedAllMembers(newSelection);
                }}
                selectionModel={selectedAllMembers}
              />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={2} container alignItems="center" justifyContent="center">
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleAddMembers}
                  disabled={selectedAllMembers.length === 0}
                >
                  <ArrowForwardIcon />
                </Button>
                <Button
                  variant="contained"
                  onClick={handleRemoveMembers}
                  disabled={selectedAllMembers.length === 0}
                >
                  <ArrowBackIcon />
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={5}>
              <h2 style={{color:'#3e3e3e', marginTop: '30px'}}>프로젝트 참여 멤버</h2>
              <p style={{ marginBottom: '30px', marginTop: '15px', display: 'block', color:'#3e3e3e' }}>프로젝트에서 제외할 멤버를 선택 후, 화살표 아이콘을 눌러 해당 프로젝트에서 제외해주세요.</p>
              <DataGrid
                rows={projectMembers}
                columns={columns}
                checkboxSelection
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                sx={{
                  fontFamily:'Pretendard',
                  backgroundColor:'white',
                  borderRadius:'10px'
                }}
                hideFooter
                hideFooterPagination 
                onSelectionModelChange={(newSelection) => {
                  setSelectedAllMembers(newSelection);
                }}
                selectionModel={selectedAllMembers}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained"  sx={{ margin: '30px 20px 5px 30px', width:'130px', fontFamily:'Pretendard', color: 'white',backgroundColor: '#7C97FE', '&:hover': { backgroundColor: '#5A7ECF' } }}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}
