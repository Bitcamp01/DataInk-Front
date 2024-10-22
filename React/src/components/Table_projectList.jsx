import * as React from 'react';
import Box from '@mui/material/Box';
import  '../css/table.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Table_projectList_modal from './Table_projectList_modal';
import { useSelector } from 'react-redux';


const rows = [
  { id: 1, project_name: 'Snow', description: '이 프로젝트는 이렇습니다. 프로젝트에 대한 설명이 들어갈 것 입니다. ', regdate: '2024-03-15', member: '김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
  { id: 2, project_name: 'Lannister', description: '인공지능을 하기 위한 프로젝트입니다. ', regdate: '2024-03-15' , member: '김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
  { id: 3, project_name: 'Lannister', description: 'Ai를 활용하여 데이터를 수집하고 있습니다. ', regdate: '2024-03-15' , member: '김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
  { id: 4, project_name: 'Stark', description: 'Ai를 활용하여 데이터를 수집하고 있습니다. ', regdate: '2024-03-15' , member: '김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
  { id: 5, project_name: 'Targaryen', description:'Ai를 활용하여 데이터를 수집하고 있습니다. ', regdate: '2024-03-15' , member: '김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
  { id: 6, project_name: 'Melisandre', description: 'Ai를 활용하여 데이터를 수집하고 있습니다. ', regdate: '2024-03-15' , member: '김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
  { id: 7, project_name: 'Clifford', description: 'Ai를 활용하여 데이터를 수집하고 있습니다. ', regdate: '2024-03-15' , member: '김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
  { id: 8, project_name: 'Frances', description: 'Ai를 활용하여 데이터를 수집하고 있습니다. ', regdate: '2024-03-15' , member:'김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
  { id: 9, project_name: 'Roxie', description: 'Ai를 활용하여 데이터를 수집하고 있습니다. ', regdate: '2024-03-15' , member: '김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
  { id: 10, project_name: 'Roxie', description: 'Ai를 활용하여 데이터를 수집하고 있습니다. ', regdate: '2024-03-15' , member: '김병주, 오유빈, 마태림 , 최수민, 김화영, 서재환, 김시표'},
];

export default function Table_projectList() {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  
  const projectListAll= useSelector(state => state.memberSlice.projectsData);
  // 콘솔에 데이터를 출력하여 확인
console.log("Current projectListAll data:", projectListAll);

  const handleEditClick = (id) => {
    const row = rows.find((row)=> row.id === id);
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const columns = React.useMemo (()=> [
    { field: 'id', headerName: 'No', flex: 60 / 1160 , cellClassName: 'first-column', headerClassName: 'header-text' }, 
  { field: 'project_name', headerName: '프로젝트 이름', flex: 200 / 1160 },  
  { field: 'description', headerName: '프로젝트 설명', flex: 400 / 1160 }, 
  { field: 'regdate', headerName: '프로젝트 생성일', flex: 150 / 1160 },  
  { field: 'member', headerName: '프로젝트 참여자', flex: 350 / 1160 },  

    {
      field: 'actions',
      type: 'actions',
      headerName: '참여자 편집',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
        icon={<EditIcon sx={{ color: '#7C97FE ' }} />}// 편집 아이콘
          label="Edit"
          onClick={() => handleEditClick(params.id)} // 아이콘 클릭 시 모달 열기
          color="inherit"
        />,
      ],
    },

  ],[]);

  return (
    <div style={{ width: '70%' }}>
    <Box sx={{
       maxWidth: '100%', 
       minWidth:'1135px', 
       marginBottom: '39px', 
       boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)', 
       borderRadius: '10px'}}>

      <DataGrid
        rows={(projectListAll ?? []).map((item, index) => ({
          id: item.projectId,
          project_name: item.name,       
          description: item.description || '설명 없음', 
          regdate: item.startDate,  
          member: item.userId,         
        }))} 
        columns={columns} 
        rowHeight={40} 
        headerHeight={50}
        sx={{
          background:'white',
          fontFamily: 'Pretendard, Noto-sans KR',  
          '& .MuiDataGrid-columnHeaders': {           
            color: '#7C97FE',  
            fontWeight: 'bold',  
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',  
          }, 
          '& .first-column': {
            paddingLeft: '20px', // 첫 번째 컬럼 셀에 왼쪽 공백 추가
          },

          '& .header-text': {
            paddingLeft: '20px', // 첫 번째 컬럼 셀에 왼쪽 공백 추가
            
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: '#7c97fe', // 헤더 텍스트 색상을 변경
          },
        }}
        autoHeight
        disableRowSelectionOnClick
        hideFooter
        classes={{
            cell: 'custom-cell', 
            columnHeader: 'custom-header', 
          }}
      />
    </Box>


      {/* 프로젝트 편집 모달창 */}
      {open && (
      <Table_projectList_modal
        open = {open}
        onClose = {handleClose}
        selectedRow = {selectedRow}
      />
      )}

    </div>
   

    );
}