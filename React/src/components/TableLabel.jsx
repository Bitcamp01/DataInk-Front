import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import  '../css/table-label.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CommonButton from '../components/CommonButton'
import ConfirmModal from './labelling/ConfirmModal';

const columns = [
  { field: 'id', headerName: 'No', width: 90, headerClassName: 'no-column-header', cellClassName: 'no-column-cell' },
  { field: 'category1', headerName: '대분류', width: 150 },
  { field: 'category2', headerName: '중분류', width: 150 },
  { field: 'category3', headerName: '소분류', width: 150 },
  { field: 'workname', headerName: '작업명', width: 300 },
  { field: 'workstatus', headerName: '작업상태', width: 170 },
  { field: 'deadline', headerName: '마감일', width: 250 },
];

const rows = [
  { id: 1, category1: '텍스트', category2: 'OCR', category3: '영수증', workname: '영수증 인식 작업', workstatus: '진행중', deadline: '2024-03-15' },
  { id: 2, category1: '이미지', category2: '객체 탐지', category3: '교통표지판', workname: '교통표지판 인식 작업', workstatus: '진행중', deadline: '2024-03-20' },
  { id: 3, category1: '음성', category2: '음성 변환', category3: '인터뷰', workname: '인터뷰 음성 라벨링 작업', workstatus: '진행중', deadline: '2024-03-25' },
  { id: 4, category1: '텍스트', category2: '번역', category3: '기술문서', workname: '기술문서 번역 라벨링', workstatus: '진행중', deadline: '2024-03-30' },
  { id: 5, category1: '이미지', category2: '분류', category3: '상품 이미지', workname: '상품 이미지 분류 작업', workstatus: '반려됨', deadline: '2024-04-01' },
  { id: 6, category1: '음성', category2: '음성 인식', category3: '콜센터 대화', workname: '콜센터 대화 음성 인식', workstatus: '반려됨', deadline: '2024-04-05' },
  { id: 7, category1: '텍스트', category2: '기술문서', category3: '리뷰', workname: '리뷰 분석 라벨링', workstatus: '반려됨', deadline: '2024-04-10' },
  { id: 8, category1: '이미지', category2: '객체 탐지', category3: '교통표지판', workname: '추가 교통표지판 라벨링', workstatus: '반려됨', deadline: '2024-04-15' },
  { id: 9, category1: '텍스트', category2: '감정 분석', category3: 'SNS 데이터', workname: 'SNS 데이터 감정 분석', workstatus: '반려됨', deadline: '2024-04-20' },
  { id: 10, category1: '음성', category2: '대화 분석', category3: '뉴스 인터뷰', workname: '뉴스 인터뷰 대화 분석', workstatus: '반려됨', deadline: '2024-04-25' },
];

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝에 정렬 */
  width: 100%; /* 원하는 너비 설정 */
`;


export default function DataGridDemo() {
  const navigate = useNavigate();

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]); // 선택된 행을 관리하는 상태
  const [modalMessage, setModalMessage] = React.useState("선택한 작업을 검수 요청하시겠습니까?");
  const [isModalOpen, setIsModalOpen] = React.useState(false); // 모달창 열고 닫기 상태
  const [isConfirmed, setIsConfirmed] = React.useState(false); // 확인 상태 관리

  
  const handleRowClick = (params) => {
    // const { id } = params.row;
    navigate(`/label/detail`);
  };

  const handleCellClick = (params, event) => {
    if (params.field === 'id') {
      event.stopPropagation(); // No 컬럼 클릭 시 기존 이벤트 막기
  
      // 체크박스 선택/해제 로직
      const isSelected = rowSelectionModel.includes(params.id);
      let newSelectionModel = [];
  
      if (isSelected) {
        // 이미 선택된 경우 -> 선택 해제
        newSelectionModel = rowSelectionModel.filter((id) => id !== params.id);
      } else {
        // 선택되지 않은 경우 -> 선택 추가
        newSelectionModel = [...rowSelectionModel, params.id];
      }
  
      setRowSelectionModel(newSelectionModel); // 상태 업데이트
    }
  };

  const handleSubmitForReview = () => {
    if (rowSelectionModel.length === 0) {
      alert("검수 요청할 작업을 선택하세요.");
      return;
    }
    
    setIsModalOpen(true); // 모달을 열기
  };
  
  const handleConfirm = () => {
    submitTaskForReview();
    setModalMessage("검수 요청이 완료되었습니다.");  // 메시지 변경
    setIsConfirmed(true);  // 예/아니오 버튼을 숨기고 확인 버튼을 표시
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setIsConfirmed(false);
    setModalMessage("선택한 작업을 검수 요청하시겠습니까?");
  };
  
  const submitTaskForReview = () => {
    // 검수 요청을 서버로 전송하는 로직 필요
  };
  

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ 
      width: '100%',  
      maxWidth: '100%',
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
        rowSelectionModel={rowSelectionModel}  // 선택된 행의 ID를 상태로 관리
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);  // 새로운 선택 값을 상태로 업데이트
        }}
        onRowClick={handleRowClick}
        onCellClick={handleCellClick} // 셀 클릭 핸들러, 체크박스 옆에 실수로 눌렀을 때 이동 방지
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
            <CommonButton onClick={handleSubmitForReview}>검수 요청</CommonButton>
            {isModalOpen && (
                <ConfirmModal 
                    message={modalMessage}
                    isConfirmed={isConfirmed}
                    onConfirm={handleConfirm}
                    onClose={resetModalState} // 닫기 로직을 단순화
                />
            )}
        </ButtonContainer>
    </div>

    );
}