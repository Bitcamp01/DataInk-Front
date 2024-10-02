import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import  '../css/table.css';


const columns = [
  { field: 'id', headerName: 'No', flex: 90 / 1100 }, 
  { field: 'title', headerName: '제목', flex: 580 / 1100 },  
  { field: 'writer', headerName: '작성자', flex: 140 / 1100 }, 
  { field: 'department', headerName: '소속(부서)', flex: 140 / 1100 },  
  { field: 'regdate', headerName: '작성일', flex: 150 / 1100 },  
];

const rows = [
  { id: 1, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
  { id: 2, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
  { id: 3, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
  { id: 4, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
  { id: 5, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
  { id: 6, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
  { id: 7, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
  { id: 8, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
  { id: 9, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
  { id: 10, title: '[프로젝트000]라벨링 작성 시 유의할 점을 꼭 확인해주세요.', writer: '김시표', department: 'AI Clova' , regdate: '2024-03-15'},
];
  
export default function Table_Notice() {
  return (
    <div style={{ width: '70%' }}>
    <Box sx={{ width: '100%',  
      minWidth:'1135px', 
      marginBottom: '39px', 
      boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)', }}>

      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40} 
        headerHeight={50}
        sx={{
          backgroundColor:'white',
          fontFamily: 'Pretendard, NotoSansKR', 
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',  
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



    </div>

    );
}

