import * as React from 'react';
import { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMember } from '../apis/memberManagementApis';
import Stack from '@mui/material/Stack';
import '../css/table.css';
import '../css/memberManagement.css';

const columns = [
  { field: 'id', headerName: 'No', flex: 60 / 1100 ,cellClassName: 'first-column', headerClassName: 'header-text'  },  
  { field: 'name', headerName: '이름', flex: 170 / 1100 },  
  { field: 'department', headerName: '소속(부서)', flex: 180 / 1100 },  
  { field: 'email', headerName: '이메일', flex: 250 / 1100 },  
  { field: 'tel', headerName: '전화번호', flex: 170 / 1100 }, 
  { field: 'role', headerName: '역할', flex: 100 / 1100 },  
  { field: 'regdate', headerName: '등록일', flex: 170 / 1100 },  
];



const Table_memberListAll = () => {
  const memberListAll= useSelector(state => state.memberSlice.member);
  const page = useSelector(state => state.memberSlice.page);
  const totalPageCount = memberListAll?.totalPages ?? 1; // totalPages가 undefined인 경우 기본값 1
  

  const navi = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMember({
      page: 0
    }));
  },[]);

  const changePage = React.useCallback((e, v) => {
    dispatch(getMember({
      page:parseInt(v) -1
    }));
  },[dispatch]);

 
  return (
    <div style={{ display: 'flex', flexDirection:'column',   justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    <Box sx={{ 
      width: '100%',  
      maxWidth: '70%',
      minWidth:'1135px' ,
      marginBottom: '39px', 
      boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)', 
      borderRadius: '10px'
      }}>

      <DataGrid
         rows={(memberListAll?.content ?? []).map((item, index) => ({
          id: item.noticeId,                  
          name: item.name,       
          department: item.department || '부서 정보 없음', 
          email: item.email,  
          tel: item.tel, 
          role:item.role, 
          regdate: item.created               
        }))} 
        columns={columns}
        pageSize={10}    
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

    {/* 페이지네이션 */}
    <div className="pagination-container custom-pagination" style={{ marginTop: '20px',  width: '100%'  }}>
        <Stack spacing={2} sx={{ marginBottom: '80px' }}>
          <Pagination 
            count={totalPageCount} 
            page={page + 1} 
            onChange={changePage} 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px 0',
              '& .MuiPaginationItem-root': {
                color: '#7c97fe !important', // 기본 페이지 버튼의 색상
              },
              '& .Mui-selected': {
                backgroundColor: '#7c97fe', // 선택된 페이지 색상
                color: '#ffffff', 
              },
              '& .MuiPaginationItem-root:not(.Mui-selected)': {
                color: '#3e3e3e', // 선택되지 않은 페이지 텍스트 색상 설정 
              },
              '& .MuiPaginationItem-ellipsis': {
                color: '#3e3e3e', // 페이지 사이의 점 색상
              },
            }}
          />
        </Stack>
      </div>



    
    </div>

    

    );
}

export default Table_memberListAll;

