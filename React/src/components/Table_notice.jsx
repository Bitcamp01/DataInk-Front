import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import  '../css/table.css';






const columns = [
  { field: 'id',
    headerName: 'No',
    width: 90,
    headerClassName: 'no-column-header', 
    cellClassName: 'no-column-cell', 
    resizable: false,
    
   },
 
  {
    field: 'title',
    headerName: '제목',
    width:580,
   
  },
  {
    field: 'writer',
    headerName: '작성자',
    width: 140,
  },

  {
    field: 'department',
    headerName: '소속(부서)',
    width: 140,
    
  },
  

  {
    field: 'regdate',
    headerName: '작성일',
    width: 150,
    resizable: false,
  },
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
    <div style={{ width: '100%' }}>
    <Box sx={{ width: '100%',  maxWidth: '1135px', minWidth:'1135px', marginBottom: '39px', boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)', }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40} 
        headerHeight={50}
        sx={{
          fontFamily: 'Pretendard, NotoSansKR', 
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',  // 컬럼 헤더의 분리선 제거 
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

