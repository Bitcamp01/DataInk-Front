import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import  '../css/table.css';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'No', flex: 60 / 1100 ,cellClassName: 'first-column', headerClassName: 'header-text'  },  
  { field: 'name', headerName: '이름', flex: 170 / 1100 },  
  { field: 'department', headerName: '소속(부서)', flex: 180 / 1100 },  
  { field: 'email', headerName: '이메일', flex: 250 / 1100 },  
  { field: 'tel', headerName: '전화번호', flex: 170 / 1100 }, 
  { field: 'role', headerName: '역할', flex: 100 / 1100 },  
  { field: 'regdate', headerName: '등록일', flex: 170 / 1100 },  
];

// const rows = [
//   { id: 1, name: 'Snow', department: 'Jon', email: 'bitcamp@gamil.com' , tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
//   { id: 2, name: 'Lannister', department: 'Cersei', email: 'bitcamp@gamil.com' ,tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
//   { id: 3, name: 'Lannister', department: 'Jaime', email: 'bitcamp@gamil.com' ,tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
//   { id: 4, name: 'Stark', department: 'Arya', email: 'bitcamp@gamil.com' ,tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
//   { id: 5, name: 'Targaryen', department: 'Daenerys', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15' },
//   { id: 6, name: 'Melisandre', department: 'Ai', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
//   { id: 7, name: 'Clifford', department: 'Ferrara', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15' },
//   { id: 8, name: 'Frances', department: 'Rossini', email: 'bitcamp@gamil.com' , tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15'},
//   { id: 9, name: 'Roxie', department: 'Harvey', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15' },
//   { id: 10, name: 'Roxie', department: 'Harvey', email: 'bitcamp@gamil.com', tel:'010-0000-1111', role :'관리자', regdate: '2024-03-15' },
// ];



export default function Table_memberListAll() {
  const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/users', { params: { page: 0, size: 15 } });
          const data = response.data.content.map((item) => ({
            id: item.userId,
            name: item.name,
            dep: item.dep,
            email: item.email,
            tel: item.tel,
            authen: item.authen,
            regdate: item.regdate,
          }));
          setRows(data);
        } catch (error) {
          console.error("데이터 가져오기 에러:", error);
        }
      };

      fetchData();
    }, []);
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    <Box sx={{ 
      width: '100%',  
      maxWidth: '70%',
      minWidth:'1135px' ,
      marginBottom: '39px', 
      boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)', 
      borderRadius: '10px'
      }}>

      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40} 
        headerHeight={50}
        checkboxSelection
        componentsProps={{
          baseCheckbox: {
            sx: {
              color: '#7C97FE', 
              '&.Mui-checked': {
                color: '#7C97FE', 
              },
              '&:hover': {
                color: '#7C97FE', 
              },
            },
          },
        }}
        sx={{
          background:'white',
          fontFamily: 'Pretendard, Noto-sans KR',  
                            '& .MuiDataGrid-columnHeaders': {//컬럼 헤더의 폰트 설정               
                    color: '#7C97FE',  
                    fontWeight: 'bold',  
                  },
                  '& .MuiDataGrid-columnSeparator': {
                    display: 'none',  // 컬럼 헤더의 분리선 제거 
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


    
    </div>

    

    );
}

