import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Menu, MenuItem, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Chip, Box, Typography, Drawer } from '@mui/material'; // MUI 컴포넌트 임포트

// 상태 칩을 렌더링하는 함수
function renderStatus(status) {
  const colors = {
    Online: 'success',
    Offline: 'default',
  };
  return <Chip label={status} color={colors[status]} size="small" />;
}

// columns 정의
const columns = [
  { field: 'label', headerName: 'label', flex: 1.5, minWidth: 200 }
];
function generateRandomRows(numRows) {
  const label = ['Homepage Overview', 'Pricing Page', 'About Us', 'Contact', 'Services', 'Blog', 'Careers'];
 
  
  return Array.from({ length: numRows }, (_, index) => ({
    id: index + 1,
    label: label[Math.floor(Math.random() * label.length)]
  }));
}
// 메인 컴포넌트
export default function CustomizedDataGrid({selectedFolderData}) {
  const [rows, setRows] = useState(generateRandomRows(100));
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행 저장
  const [selectedRow, setSelectedRow] = useState(null);
  const [contextMenu, setContextMenu] = useState(null); // 컨텍스트 메뉴 상태
  const [cutRows, setCutRows] = useState([]); // 잘라낸 행
  const [isRenaming, setIsRenaming] = useState(false); // 이름 변경 모드
  const [newName, setNewName] = useState(''); // 새로운 이름 저장
  // 우클릭 이벤트 핸들러
  const handleContextMenu = (event) => {
    console.log("111111111111111111111");
    event.preventDefault();
    setSelectedRows(Number(event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  // 컨텍스트 메뉴 닫기
  const handleClose = () => {
    setContextMenu(null);
  };

  // 이름 변경 처리
  const handleRename = () => {
    setIsRenaming(true);
    handleClose();
  };

  const handleRenameSubmit = () => {
    const updatedRows = rows.map((row) =>
      selectedRows.includes(row.id) ? { ...row, name: newName } : row
    );
    setRows(updatedRows);
    setIsRenaming(false);
    setNewName('');
  };

  // 삭제 처리
  const handleDelete = () => {
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(updatedRows);
    setSelectedRows([]);
    handleClose();
  };

  // 자르기 처리
  const handleCut = () => {
    setCutRows(selectedRows);
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(updatedRows);
    setSelectedRows([]);
    handleClose();
  };

  // 복사 처리
  const handleCopy = () => {
    setCutRows(selectedRows); // 잘라내지 않고 복사만 할 수 있음
    handleClose();
  };
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };
  const handleSidePanelClose = () => {
    setSelectedRow(null);
  };
  // 붙여넣기 처리
  const handlePaste = () => {
    if (cutRows.length > 0) {
      const rowsToPaste = rows.filter((row) => cutRows.includes(row.id)).map((row) => ({ ...row, id: rows.length + 1 }));
      setRows((prevRows) => [...prevRows, ...rowsToPaste]);
      setCutRows([]);
    }
    handleClose();
  };
    
  const SidePanel = ({ selectedRow, onClose }) => {
    // 사이드 패널 닫기 핸들러
    const handleSidePanelClose = () => {
      setSelectedRow(null);
    };
    return (
      <Drawer
        anchor="right"
        open={Boolean(selectedRow)}
        onClose={onClose}
        sx={{ width: '30%', flexShrink: 0, '& .MuiDrawer-paper': { width: '30%' } }}
      >
        <Box p={2}>
          {selectedRow ? (
            <>
              <Typography variant="h6">Selected Row Details</Typography>
              <Typography>Name: {selectedRow.name}</Typography>
              <Typography>Status: {selectedRow.status}</Typography>
            </>
          ) : (
            <Typography variant="body2">No row selected</Typography>
          )}
        </Box>
      </Drawer>
    );
  };
  return (
    <>
      <Box display="flex" flexDirection="row" height="40rem">
        <Box flexGrow={1}>
          <DataGrid
            onSelectionModelChange={(newSelection) => console.log(newSelection)}
            checkboxSelection
            rows={rows}
            getRowId={(row) => row.id}
            columns={columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            paginationMode="client"
            rowBuffer={10}
            disableColumnResize
            density="compact"
            onRowClick={handleRowClick}
            slotProps={{
              row: {
                onContextMenu: handleContextMenu,
                style: { cursor: 'context-menu' },
              },
            }}
            sx={{
              height: "40rem",  // 고정된 높이 설정
              '& .MuiDataGrid-virtualScroller': {
                overflowY: 'scroll',
              },
              '& .MuiDataGrid-footerContainer': {
                display: 'none',
              },
            }}
          />
        </Box>

        {/* 사이드 패널 */}
        <SidePanel selectedRow={selectedRow} onClose={handleSidePanelClose} />
      </Box>

      {/* 컨텍스트 메뉴 */}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleRename}>이름 변경</MenuItem>
        <MenuItem onClick={handleDelete}>삭제</MenuItem>
        <MenuItem onClick={handleCut}>자르기</MenuItem>
        <MenuItem onClick={handleCopy}>복사</MenuItem>
        <MenuItem onClick={handlePaste}>붙여넣기</MenuItem>
      </Menu>

      {/* 이름 변경 다이얼로그 */}
      <Dialog open={isRenaming} onClose={() => setIsRenaming(false)}>
        <DialogTitle>이름 변경</DialogTitle>
        <DialogContent>
          <TextField
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            label="새 이름 입력"
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRenaming(false)}>취소</Button>
          <Button onClick={handleRenameSubmit}>저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
