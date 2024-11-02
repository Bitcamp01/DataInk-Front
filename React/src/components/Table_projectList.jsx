// import * as React from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchTabData, getUserNames } from '../apis/memberManagementApis';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월을 2자리로 맞춤
  const day = ('0' + date.getDate()).slice(-2); // 일을 2자리로 맞춤
  
  return `${year}-${month}-${day}`; // 원하는 형식으로 반환
};


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
  const [processedProjects, setProcessedProjects] = React.useState([]);

  const page = useSelector(state => state.memberSlice.page); // 현재 페이지
  const totalPageCount = useSelector(state => state.memberSlice.totalPages); // 총 페이지 수
  const projectListAll= useSelector(state => state.memberSlice.projectsData);
  // 콘솔에 데이터를 출력하여 확인

const dispatch = useDispatch();

useEffect(() => {
  const fetchMemberData = async () => {
    const projectDataWithMembers = await Promise.all(
      (projectListAll ?? []).map(async (project) => {
        const memberNames = await dispatch(getUserNames(project.projectId));

      // 데이터가 예상한 형태인지 확인
          if (Array.isArray(memberNames.payload)) {
            return {
              ...project,
              member: memberNames.payload.join(', '), // 멤버 이름을 쉼표로 구분하여 문자열로 반환
            };
          } else {
            console.error("Expected an array but got:", memberNames.payload);
            return {
              ...project,
              member: '데이터 형식 오류', // 오류 발생 시 기본값 설정
            };
          }
        })
      );
    setProcessedProjects(projectDataWithMembers);
  };

  if (projectListAll) {
    fetchMemberData();
  }
}, [projectListAll, dispatch]);

const changePage = useCallback((e, v) => {
  const newPage = parseInt(v) ; // 페이지 번호를 0 기반으로 변경
  dispatch(fetchTabData({
    tab: 'projects',
    page: newPage // 0 기반 페이지 전송
  }));
}, [dispatch]);

//맵을 위에서 하고. 
// 밑에 datarow에서는 가져오는것 


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
  { field: 'regdate', headerName: '프로젝트 생성일', flex: 170 / 1160 },  
  { field: 'member', headerName: '프로젝트 참여자', flex: 330 / 1160 },  

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
        rows={(processedProjects ?? []).map((item, index) => ({
          id: item.projectId,
          project_name: item.name,       
          description: item.description || '설명 없음', 
          regdate: formatDate(item.startDate),  
          member: item.member,         
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

    {/* 페이지네이션 */}
    <div className="pagination-container custom-pagination" style={{ marginTop: '20px',  width: '100%'  }}>
        <Stack spacing={2} sx={{ marginBottom: '80px' }}>
          <Pagination 
            count={totalPageCount} 
            page={page} 
            onChange={changePage} 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px 0',
              '& .MuiPaginationItem-root': {
                color: '#7c97fe', // 기본 페이지 버튼의 색상
              },
              '& .Mui-selected': {
                backgroundColor: '#7c97fe', // 선택된 페이지 색상
                color: '#ffffff', 
              },
              '& .MuiPaginationItem-root:not(.Mui-selected)': {
                color: '#3e3e3e  !important', // 선택되지 않은 페이지 텍스트 색상 설정 
              },
              '& .MuiPaginationItem-ellipsis': {
                color: '#3e3e3e', // 페이지 사이의 점 색상
              },
            }}
          />
        </Stack>
      </div>



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