import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, useGridSelector } from '@mui/x-data-grid';
import  '../css/table.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNotice } from '../apis/noticeApis';
import { useEffect } from 'react';




const columns = [
  { field: 'id', headerName: 'No', flex: 90 / 1100, cellClassName: 'first-column', headerClassName: 'header-text'  }, 
  { field: 'title', headerName: '제목', flex: 580 / 1100 },  
  { field: 'writer', headerName: '작성자', flex: 140 / 1100 }, 
  { field: 'department', headerName: '소속(부서)', flex: 140 / 1100 },  
  { field: 'regdate', headerName: '작성일', flex: 150 / 1100 },  
];


const Table_notice = () => {
  const notice = useSelector(state => state.noticeSlice.notice);
  const searchCondition = useSelector(state => state.noticeSlice.searchCondition);
  const searchKeyword = useSelector(state=> state.noticeSlice.searchKeyword);
  const page = useSelector(state => state.noticeSlice.page);

  const navi = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotice({
      searchCondition: 'all',
      searchKeyword: '',
      page: 0
    }));
  },[]);

  const changePage = React.useCallback((e, v) => {
    dispatch(getNotice({
      searchCondition,
      searchKeyword,
      page:parseInt(v) -1
    }));
  },[searchCondition, searchKeyword]);

    
  return (
    <div style={{ width: '70%' }}>
    <Box sx={{ width: '100%',  
      minWidth:'1135px', 
      marginBottom: '39px', 
      boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)',
      borderRadius: '10px', 
      
      }}>

      <DataGrid
        rows={notice}
        columns={columns}
        rowHeight={40} 
        headerHeight={50}
        sx={{
          backgroundColor:'white',
          fontFamily: 'Pretendard, NotoSansKR', 
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',  
          },  
          '& .MuiDataGrid-root': {
            border: 'none', // 기본 DataGrid의 테두리 제거
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none', // 셀 아래쪽의 기본 테두리 제거
          }, 
          '& .first-column': {
            paddingLeft: '20px', // 첫 번째 컬럼 셀에 왼쪽 공백 추가
          },

          '& .header-text': {
            paddingLeft: '20px', // 첫 번째 컬럼 셀에 왼쪽 공백 추가
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

export default Table_notice;