import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../css/table-label.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CommonButton from '../components/CommonButton';
import ConfirmModal from './labelling/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { submitForReview } from '../apis/labelTableApis';

const columns = [
  { field: 'id', headerName: 'No', width: 90, headerClassName: 'no-column-header', cellClassName: 'no-column-cell' },
  { field: 'category1', headerName: '대분류', width: 150 },
  { field: 'category2', headerName: '중분류', width: 150 },
  { field: 'category3', headerName: '소분류', width: 150 },
  { field: 'workname', headerName: '작업명', width: 300 },
  { field: 'workstatus', headerName: '작업상태', width: 170 },
  { field: 'deadline', headerName: '마감일', width: 250 }
];

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export default function DataGridDemo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]); // 선택된 행을 관리하는 상태
  const [modalMessage, setModalMessage] = React.useState('선택한 작업을 검수 요청하시겠습니까?');
  const [isModalOpen, setIsModalOpen] = React.useState(false); // 모달창 열고 닫기 상태
  const [isConfirmed, setIsConfirmed] = React.useState(false); // 확인 상태 관리
  const [selectedTaskIds, setSelectedTaskIds] = React.useState([]); // taskId를 관리하는 상태

  const tableData = useSelector((state) => state.labelTableSlice.tableData);

  const handleRowClick = (params) => {
    const { taskId } = params.row;
    navigate(`/label/detail/${taskId}`);
  };

  const handleCellClick = (params, event) => {
    if (params.field === 'id') {
      event.stopPropagation();

      const taskId = params.row.taskId;
      console.log('선택한 task:', taskId);

      const isSelected = rowSelectionModel.includes(params.id);
      let newSelectionModel = [];
      let newTaskSelectionModel = [];

      if (isSelected) {
        newSelectionModel = rowSelectionModel.filter((id) => id !== params.id);
        newTaskSelectionModel = selectedTaskIds.filter((id) => id !== taskId);
      } else {
        newSelectionModel = [...rowSelectionModel, params.id];
        newTaskSelectionModel = [...selectedTaskIds, taskId];
      }

      setRowSelectionModel(newSelectionModel); // 체크박스 상태 업데이트
      setSelectedTaskIds(newTaskSelectionModel); // taskId 상태 업데이트
    }
  };

  const handleSelectionChange = (newSelectionModel) => {
    setRowSelectionModel(newSelectionModel);

    const selectedIds = newSelectionModel.map((id) => {
      const selectedRow = tableData.find((row) => row.id === id);
      return selectedRow ? selectedRow.taskId : null;
    }).filter(Boolean);

    setSelectedTaskIds(selectedIds);
    console.log('선택한 taskIds:', selectedIds);
  };

  const handleSubmitForReview = () => {
    if (selectedTaskIds.length === 0) {
      alert('검수 요청할 작업을 선택하세요.');
      return;
    }

    setIsModalOpen(true); // 모달을 열기
  };

  const handleConfirm = () => {
    submitTaskForReview();
    setModalMessage('검수 요청이 완료되었습니다.');
    setIsConfirmed(true);
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setIsConfirmed(false);
    setModalMessage('선택한 작업을 검수 요청하시겠습니까?');
  };

  const submitTaskForReview = () => {
    console.log('선택한 taskIds: ', selectedTaskIds);
    dispatch(submitForReview(selectedTaskIds))
      .unwrap()
      .then(() => {
        setModalMessage('검수 요청이 완료되었습니다.');
      })
      .catch((error) => {
        console.error('Error during submission:', error);
        setModalMessage('검수 요청 중에 에러가 발생했습니다.');
      });
  };

  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          minWidth: '1135px',
          marginBottom: '39px',
          boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.08)',
          borderRadius: '10px'
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          rowHeight={40}
          headerHeight={50}
          checkboxSelection
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={handleSelectionChange}
          onRowClick={handleRowClick}
          onCellClick={handleCellClick}
          sx={{
            background: 'white',
            fontFamily: 'Pretendard, Noto-sans KR',
            cursor: 'pointer',
            '& .MuiDataGrid-columnHeaders': {
              color: '#7C97FE',
              fontWeight: 'bold'
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none'
            },
            '& .first-column': {
              paddingLeft: '20px'
            },
            '& .header-text': {
              paddingLeft: '20px'
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: '#7c97fe'
            },
            '& .MuiDataGrid-root': {
              outline: 'none'
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none'
            },
            '& .MuiDataGrid-row:focus-within': {
              outline: 'none'
            }
          }}
          autoHeight
          disableRowSelectionOnClick
          hideFooter
        />
      </Box>

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
            onClose={resetModalState}
          />
        )}
      </ButtonContainer>
    </div>
  );
}
