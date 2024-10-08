import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import  '../css/table-label.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CommonButton from '../components/CommonButton'

const columns = [
  { field: 'id', headerName: 'No', width: 90, headerClassName: 'no-column-header', cellClassName: 'no-column-cell' },
  { field: 'category1', headerName: '대분류', width: 150 },
  { field: 'category2', headerName: '중분류', width: 150 },
  { field: 'category3', headerName: '소분류', width: 150 },
  { field: 'workname', headerName: '작업명', width: 300 },
  { field: 'worknum', headerName: '작업번호', width: 170 },
  { field: 'deadline', headerName: '마감일', width: 250 },
];

const rows = [
  { id: 1, category1: '텍스트', category2: 'OCR', category3: '영수증', workname: '영수증 인식 작업', worknum: 'W12345', deadline: '2024-03-15' },
  { id: 2, category1: '이미지', category2: '객체 탐지', category3: '교통표지판', workname: '교통표지판 인식 작업', worknum: 'W12346', deadline: '2024-03-20' },
  { id: 3, category1: '음성', category2: '음성 변환', category3: '인터뷰', workname: '인터뷰 음성 라벨링 작업', worknum: 'W12347', deadline: '2024-03-25' },
  { id: 4, category1: '텍스트', category2: '번역', category3: '기술문서', workname: '기술문서 번역 라벨링', worknum: 'W12348', deadline: '2024-03-30' },
  { id: 5, category1: '이미지', category2: '분류', category3: '상품 이미지', workname: '상품 이미지 분류 작업', worknum: 'W12349', deadline: '2024-04-01' },
  { id: 6, category1: '음성', category2: '음성 인식', category3: '콜센터 대화', workname: '콜센터 대화 음성 인식', worknum: 'W12350', deadline: '2024-04-05' },
  { id: 7, category1: '텍스트', category2: '기술문서', category3: '리뷰', workname: '리뷰 분석 라벨링', worknum: 'W12351', deadline: '2024-04-10' },
  { id: 8, category1: '이미지', category2: '객체 탐지', category3: '교통표지판', workname: '추가 교통표지판 라벨링', worknum: 'W12352', deadline: '2024-04-15' },
  { id: 9, category1: '텍스트', category2: '감정 분석', category3: 'SNS 데이터', workname: 'SNS 데이터 감정 분석', worknum: 'W12353', deadline: '2024-04-20' },
  { id: 10, category1: '음성', category2: '대화 분석', category3: '뉴스 인터뷰', workname: '뉴스 인터뷰 대화 분석', worknum: 'W12354', deadline: '2024-04-25' },
];

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝에 정렬 */
  width: 100%; /* 원하는 너비 설정 */
`;


export default function DataGridDemo() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleRowClick = (params) => {
    // const { id } = params.row;
    navigate(`/review`);
  };

  return (
    <div style={{ width: '100%' }}>
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
        onRowClick={handleRowClick}
        sx={{
          background:'white',
          fontFamily: 'Pretendard, Noto-sans KR',  
          cursor: 'pointer', // 마우스 포인터를 변경
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
                  '& .MuiDataGrid-root': {
                    outline: 'none', // 파란색 테두리 제거
                  },
                  '& .MuiDataGrid-cell:focus': {
                    outline: 'none', // 셀 클릭 시 포커스 outline 제거
                  },
                  '& .MuiDataGrid-row:focus-within': {
                    outline: 'none', // 행 포커스 제거
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
        <div className="pagination-container">
            <Stack spacing={2} sx={{ marginBottom: '20px' }}>
                <Pagination count={10} color="primary" />
            </Stack>
        </div>
        <ButtonContainer>
            <CommonButton>검수 요청</CommonButton>
        </ButtonContainer>
    </div>

    );
}