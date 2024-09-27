import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import  '../css/table-label.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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


export default function DataGridDemo() {
  return (
    <div className="main-content">
      <Box sx={{ width: '100%', marginBottom: '39px', boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={40} 
          headerHeight={50}
          autoHeight
          disableRowSelectionOnClick
          hideFooter
        />
      </Box>
      <div className="pagination-container">
        <Stack spacing={2} sx={{ marginBottom: '80px' }}>
          <Pagination count={10} color="primary" />
        </Stack>
      </div>
    </div>

    );
}