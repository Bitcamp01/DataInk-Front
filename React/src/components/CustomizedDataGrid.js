import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid, renderEditInputCell,GridRowEditStopReasons ,GridRowModes,apiRef,useGridApiRef,GridToolbar,GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
    } from '@mui/x-data-grid';
import { Menu, MenuItem, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Chip, Box, Typography, Drawer } from '@mui/material'; // MUI 컴포넌트 임포트
import { editableInputTypes } from '@testing-library/user-event/dist/utils';


// columns 정의, 추후 날짜,용량 등의 정보를 추가할 예정
const columns = [
  { field: 'label', headerName: 'label', flex: 1.5, minWidth: 200, editable:true,
    renderCell: (params) => (
      <span>
        {params.row.isFolder ? '📁' : '📄'} {params.value}
      </span>
    )
   }
];
// 메인 컴포넌트
export default function CustomizedDataGrid({folderData,selectedFolder = null,setFolderData}) {
  const apiRef = useGridApiRef();
  // 현재 선택된 폴더의 정보를 가지게 될 상태
  const [rows, setRows] = useState([]);
  // 선택된 행 저장, 추후 우클릭 컨텍스트 메뉴에서 수정에 사용될 것
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  // 선택된 하나의 행 정보를 다룰 때 이용, 사이드 패널에 이용
  const [selectedRow, setSelectedRow] = useState(null);
  // 컨텍스트 메뉴 상태
  const [contextMenu, setContextMenu] = useState(null); 

  // 업로드된 파일을 저장할 상태
  const [files, setFiles] = useState([]); 




  // 잘라낸 행, 다른 폴더에 붙여넣기 할 것을 가정하고 가지고 있어야 함
  const [cutRows, setCutRows] = useState([]); 
  // 복사 행, 다른 폴더에 붙여넣기 할 것을 가정하고 가지고 있어야 함
  const [copyRows, setCopyRows] = useState([]); 

  // 우클릭 이벤트 핸들러
  const handleContextMenu = (event) => {
    event.preventDefault();
    setRowSelectionModel((event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };
  useEffect(()=>{
    console.log(selectedRow);
  },[rowSelectionModel])
  const getFolderData=useCallback(()=>{
    // const response=~~~
    setRows(
      [
        {
          id: '2',
          label: "folder1",
          isFolder: true, // 폴더 여부 추가
          children: [
            {
              id: '3',
              label: "subfolder1",
              isFolder: true, // 폴더 여부 추가
              children: [],
              files: [
                { id: 'file1', label: 'file1.txt', isFolder: false, children: [] }, // 파일에도 children 추가
                { id: 'file2', label: 'file2.txt', isFolder: false, children: [] }, // 동일 구조 유지
              ], 
            },
          ],
          files: [
            { id: 'file3', label: 'file3.txt', isFolder: false, children: [] }, // 파일도 동일한 구조
            { id: 'file4', label: 'file4.txt', isFolder: false, children: [] },
          ], 
        },
        {
          id: '4',
          label: "folder1",
          isFolder: true, // 폴더 여부 추가
          children: [
            {
              id: '5',
              label: "subfolder1",
              isFolder: true, // 폴더 여부 추가
              children: [],
              files: [
                { id: 'file5', label: 'file1.txt', isFolder: false, children: [] }, // 파일에도 children 추가
                { id: 'file6', label: 'file2.txt', isFolder: false, children: [] }, // 동일 구조 유지
              ], 
            },
          ],
          files: [
            { id: 'file7', label: 'file3.txt', isFolder: false, children: [] }, // 파일도 동일한 구조
            { id: 'file8', label: 'file4.txt', isFolder: false, children: [] },
          ], 
        },
      ],
    )

  },[selectedFolder])
  useEffect(()=>{
    getFolderData();
  },[])
  // 컨텍스트 메뉴 닫기
  const handleClose = () => {
    setContextMenu(null);
  };
  // 재귀적으로 folderData에서 id를 찾아 row 데이터를 수정하는 함수
const updateFolderDataById = (folders, updatedRow) => {
  return folders.map(folder => {
    if (folder.id === updatedRow.id) {
      // 해당 id를 찾았으면 수정된 데이터로 업데이트
      return { ...folder, ...updatedRow };
    }
    if (folder.children) {
      // 자식 폴더에 대해서도 재귀적으로 탐색
      return { 
        ...folder, 
        children: updateFolderDataById(folder.children, updatedRow) 
      };
    }
    if (folder.files) {
      // 파일에 대해서도 동일한 방식으로 탐색
      return { 
        ...folder, 
        files: updateFolderDataById(folder.files, updatedRow) 
      };
    }
    return folder;
  });
};
// 파일 선택시 호출되는 핸들러
  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files); // 선택된 파일 배열로 변환
    setFiles(selectedFiles);
  };

const updateFolderData = (updatedRow) => {
  // const respone=~~~
  // if(Response=="ok")
  const updatedFolderData = updateFolderDataById(folderData, updatedRow);
  setFolderData(updatedFolderData); // MainGrid의 folderData 상태 업데이트
};
const handleDelete = ()=>{

  if (rowSelectionModel !== null && rowSelectionModel.length > 0) {
    const updatedFolderData = folderData.filter(folder => {
      // 선택된 ID 중 하나가 현재 폴더의 ID와 일치하면 제외 (삭제)
      if (rowSelectionModel.includes(folder.id)) {
        return false;
      }

      // 자식 폴더와 파일에 대해서도 동일하게 처리
      if (folder.children) {
        folder.children = folder.children.filter(child => !rowSelectionModel.includes(child.id));
      }
      if (folder.files) {
        folder.files = folder.files.filter(file => !rowSelectionModel.includes(file.id));
      }

      return true;
    });
    const updatedRows = rows.filter(folder => {
      // 선택된 ID 중 하나가 현재 폴더의 ID와 일치하면 제외 (삭제)
      if (rowSelectionModel.includes(folder.id)) {
        return false;
      }

      // 자식 폴더와 파일에 대해서도 동일하게 처리
      if (folder.children) {
        folder.children = folder.children.filter(child => !rowSelectionModel.includes(child.id));
      }
      if (folder.files) {
        folder.files = folder.files.filter(file => !rowSelectionModel.includes(file.id));
      }

      return true;
    });
    setRows(updatedRows);
    // 업데이트된 folderData 상태를 저장
    setFolderData(updatedFolderData);

    setRowSelectionModel([]);
  }
  handleClose(); 
}
   // 이름 변경 핸들러: 해당 행을 편집 모드로 전환
  const handleRename = () => {
    if (rowSelectionModel !== null) {
      setRowModesModel((prevModel) => ({
        ...prevModel,
        [rowSelectionModel]: { mode: GridRowModes.Edit }
      }));
    }
    
    handleClose(); 
  };


    // 타이머를 관리할 변수 (ref를 사용하여 state와는 별도로 관리)
  const clickTimer = useRef(null);


  const handleRowDoubleClick=(params)=>{
    const row = params.row;
    if (row.isFolder) {
      //const response=~~~~
      // setRows(newData);
    } else {
      // 파일인 경우: 사이드 패널에 표시
      setSelectedRow(row);
    }
  }
  

  // 파일 선택시 미리보기 기능 제공
  const handleSidePanelClose = () => {
    setSelectedRow(null);
  };
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.cellFocusOut || params.reason === GridRowEditStopReasons.rowFocusOut) {
      // 셀에서 포커스가 벗어나면 편집 모드 종료
      event.defaultMuiPrevented = true; 
      const rowId = params.id;
      setRowModesModel((prev) => ({
        ...prev,
        [rowId]: { mode: GridRowModes.View }, // View 모드로 전환
      }));
    }
  };


  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    updateFolderData(newRow);
    // 입력 후 벗어나면 view 모드로 변경
    setRowModesModel((prev) => ({
      ...prev,
      [newRow.id]: { mode: GridRowModes.View },
    }));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleCreateNewFolder = ()=>{
    // 새 폴더의 기본 정보 설정 (id는 임의로 설정하거나 생성하는 로직 추가 가능)
    //const response ~~~
    const newFolder = {
      id: String(new Date().getTime()), // 사용할 아이디를 백단에서 받아옴, 지금은 임시 값
      label: 'New Folder', // 기본 폴더 이름
      isFolder: true,
      children: [],
      files: [],
    };

    // 기존 폴더 데이터에 새 폴더를 추가
    const updatedRows = [...rows, newFolder];

    // rows 상태 업데이트
    setRows(updatedRows);

    // 체크박스 선택 상태 초기화
    setRowSelectionModel([newFolder.id]); // 새로 생성한 폴더 선택

    // 새 폴더 행을 편집 모드로 설정
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [newFolder.id]: { mode: GridRowModes.Edit }, // 편집 모드로 전환
    }));
    
    // folderData에도 새 폴더를 반영하는 작업
    const updatedFolderData = [...folderData, newFolder];
    setFolderData(updatedFolderData);
    apiRef.current.setCellFocus(newFolder.id, 'label');
    // 컨텍스트 메뉴 닫기
    handleClose();
  }

  // 커스텀 툴바 컴포넌트 정의
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
        <Button variant="contained" component="label" sx={{ m: 1 }}>
          파일 업로드
          <input type="file" hidden multiple accept=".pdf" onChange={handleFileUpload} />
        </Button>
      </GridToolbarContainer>
    );
  };

  // 사이드 패널 미리보기 기능 제공을 하는 부분
  const SidePanel = ({ selectedRow, onClose }) => {
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
            apiRef={apiRef}
            checkboxSelection
            disableDoubleClickEdit={true}
            rows={rows}
            getRowId={(row) => row.id}
            columns={columns}
            editMode='row'
          
            onCellDoubleClick={(params, event) => {
              if (!event.ctrlKey) {
                event.defaultMuiPrevented = true;
              }
            }}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            rowModesModel={rowModesModel}
            onRowDoubleClick={handleRowDoubleClick}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            paginationMode="client"
            rowBuffer={10}
            disableColumnResize
            density="compact"
            slots={{
              toolbar: CustomToolbar
            }}
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
        {/*<MenuItem onClick={handleCut}>자르기</MenuItem>
        <MenuItem onClick={handleCopy}>복사</MenuItem>
        <MenuItem onClick={handlePaste}>붙여넣기</MenuItem>*/}
        <MenuItem onClick={handleCreateNewFolder}>새 폴더</MenuItem> 
      </Menu>

    
    </>
  );
}
