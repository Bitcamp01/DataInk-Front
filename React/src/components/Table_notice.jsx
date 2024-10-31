import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, useGridSelector } from '@mui/x-data-grid';
import  '../css/table.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNotice } from '../apis/noticeApis';
import { useEffect } from 'react';
import { useState } from 'react';
import Notice_detail from '../pages/Notice_detail'; 






const columns = [
  { field: 'id', headerName: 'No', flex: 90 / 1100, cellClassName: 'first-column', headerClassName: 'header-text'  }, 
  { field: 'title', headerName: '제목', flex: 580 / 1100 },  
  { field: 'writer', headerName: '작성자', flex: 120 / 1100 }, 
  { field: 'department', headerName: '소속(부서)', flex: 140 / 1100 },  
  { field: 'regdate', headerName: '작성일', flex: 200 / 1100 },  
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월을 2자리로 맞춤
  const day = ('0' + date.getDate()).slice(-2); // 일을 2자리로 맞춤
  const hours = ('0' + date.getHours()).slice(-2); // 시를 2자리로 맞춤
  const minutes = ('0' + date.getMinutes()).slice(-2); // 분을 2자리로 맞춤
  
  return `${year}-${month}-${day} ${hours}:${minutes}`; // 원하는 형식으로 반환
};

const Table_notice = () => {
  const notice = useSelector(state => state.noticeSlice.notice) || []; 
  const searchCondition = useSelector(state => state.noticeSlice.searchCondition);
  const searchKeyword = useSelector(state=> state.noticeSlice.searchKeyword);
  const page = useSelector(state => state.noticeSlice.page);

  const [selectedNotice, setSelectedNotice] = useState(null); // 선택된 공지사항 데이터 저장
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    dispatch(getNotice({
      searchCondition: 'all',
      searchKeyword: '',
      page: 0
    }));
  }, [dispatch]);

  const handleRowClick = (params) => {
    // 행 클릭 시 해당 공지사항 ID를 URL로 전달하여 페이지 이동
    navigate(`/notice/${params.id}`);
   
  };

    
  return (
    <div style={{ width: '70%' }}>
    <Box sx={{ width: '100%',  
      minWidth:'1135px', 
      marginBottom: '39px', 
      boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)',
      borderRadius: '10px', 
      
      }}>

      <DataGrid
          rows={(notice && notice.content ? notice.content : []).map((item, index) => ({
          id: item.noticeId,
          title: item.title,
          writer: item.name,
          department: item.dep ? item.dep : '부서 정보 없음',
          regdate: formatDate(item.created)
        }))}
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
        onRowClick={handleRowClick} // 행 클릭 이벤트 핸들러 추가
        classes={{
            cell: 'custom-cell', 
            columnHeader: 'custom-header', 
          }}
      />
    </Box>
        {/* Notice_detail 컴포넌트에 선택된 공지사항 데이터 전달 */}
        {selectedNotice && <Notice_detail notice={selectedNotice} />}


    </div>

    );
}

export default Table_notice;