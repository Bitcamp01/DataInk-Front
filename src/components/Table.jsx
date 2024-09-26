import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import  '../css/Table.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const columns = [
  { field: 'id',
    headerName: 'No',
    width: 90,
    headerClassName: 'no-column-header', 
    cellClassName: 'no-column-cell', 
    
   },
 
  {
    field: 'name',
    headerName: '이름',
    width: 150,
   
  },
  {
    field: 'department',
    headerName: '소속(부서)',
    width: 170,
    
  },
  {
    field: 'email',
    headerName: '이메일',
    width: 270,
  },
  {
    field: 'tel',
    headerName: '전화번호',
    width: 190,
  },
  {
    field: 'role',
    headerName: '역할',
    width: 130,
  },
  {
    field: 'regdate',
    headerName: '등록일',
    width: 170,
  },
];

const rows = [
  { id: 1, name: 'Snow', department: 'Jon', email: 'bitcamp@gamil.com' , tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
  { id: 2, name: 'Lannister', department: 'Cersei', email: 'bitcamp@gamil.com' ,tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
  { id: 3, name: 'Lannister', department: 'Jaime', email: 'bitcamp@gamil.com' ,tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
  { id: 4, name: 'Stark', department: 'Arya', email: 'bitcamp@gamil.com' ,tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
  { id: 5, name: 'Targaryen', department: 'Daenerys', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15' },
  { id: 6, name: 'Melisandre', department: 'Ai', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
  { id: 7, name: 'Clifford', department: 'Ferrara', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15' },
  { id: 8, name: 'Frances', department: 'Rossini', email: 'bitcamp@gamil.com' , tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
  { id: 9, name: 'Roxie', department: 'Harvey', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15' },
  { id: 10, name: 'Roxie', department: 'Harvey', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15' },
];

export default function DataGridDemo() {
  return (
    <div style={{ width: '100%' }}>
    <Box sx={{ width: '100%', marginBottom: '39px', boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)', }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40} 
        headerHeight={50}
        // 이것도 안먹음?? 왜??? 
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
    <div className="pagination-container">
        <Stack spacing={2} sx={{ marginBottom: '80px' }}>
            <Pagination count={10} color="primary" />
        </Stack>
    </div>
    </div>

    );
}