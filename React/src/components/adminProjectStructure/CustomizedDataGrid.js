import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid,GridRowEditStopReasons ,GridRowModes,apiRef,useGridApiRef,GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
    } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import { ConeStriped } from 'react-bootstrap-icons';
import ItemSettingsModal from "./ItemSettingsModal"
import {
  Menu,
  MenuItem,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  ListItemText
} from '@mui/material'; // 누락된 컴포넌트들 import
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // Remove 아이콘 import
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios"; // InfiniteScroll 컴포넌트 import

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
export default function CustomizedDataGrid({getSelectedFolderData,folderData,selectedFolder = null,setSelectedFolder,flatFolderData,setFlatFolderData,setShouldUpdateTree}) {
  const apiRef = useGridApiRef();
  // 현재 선택된 폴더의 정보를 가지게 될 상태
  const [rows, setRows] = useState([]);
  // 선택된 행 저장, 추후 우클릭 컨텍스트 메뉴에서 수정에 사용될 것
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  // 컨텍스트 메뉴 상태
  const [contextMenu, setContextMenu] = useState(null); 


  // 잘라낸 행, 다른 폴더에 붙여넣기 할 것을 가정하고 가지고 있어야 함
  const [cutRows, setCutRows] = useState([]); 
  // 복사 행, 다른 폴더에 붙여넣기 할 것을 가정하고 가지고 있어야 함
  const [copyRows, setCopyRows] = useState([]); 

 
  // flatFolderData를 Map 형태로 관리하여 탐색 성능 향상
  const [flatFolderMap, setFlatFolderMap] = useState(new Map(flatFolderData.map(item => [item.id, item])));

  //데이터 그리드 영역 업데이트 부분
  useEffect(()=>{
    setRows(Array.from(flatFolderMap.values()).filter(item => item.parentId === selectedFolder));
  },[selectedFolder,flatFolderMap])

  // flatFolderData가 변경될 때 Map으로 업데이트
  useEffect(() => {
    setFlatFolderMap(new Map(flatFolderData.map(item => [item.id, item])));
    setShouldUpdateTree(true);
  }, [flatFolderData]);
  ///////////////////////////////////////////////////////////////////////////////////
  const [conversionList, setConversionList] = useState([]); // 변환 목록
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const handleAddToConversion = () => {
    const selectedItems = rowSelectionModel.map((id) =>
      flatFolderData.find((item) => item.id === id)
    );
  
    // 변환 목록에 이미 존재하는 항목은 추가하지 않음
    const newItems = selectedItems.filter(
      (item) => !conversionList.some((existingItem) => existingItem.id === item.id)
    );
  
    if (newItems.length > 0) {
      setConversionList((prevList) => [...prevList, ...newItems]);
    }
  
    handleClose();
  };
   // 변환 모달 열기
   const handleOpenConversionModal = () => {
    setIsConversionModalOpen(true);
  };

  // 변환 모달 닫기
  const handleCloseConversionModal = () => {
    setIsConversionModalOpen(false);
  };
  const handleRemoveFromConversionList = (itemId) => {
    setConversionList((prevList) => prevList.filter((item) => item.id !== itemId));
  };
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [items, setItems] = useState([]);

  // 항목 설정 모달 열기 (최신 아이템 리스트 로드)
  const handleOpenItemModal = async () => {
    try {
      setItems([
        {
          label:"a",id:"1"
        }
        ,
        {
          label:"b",id:"2"
        }
      ])
      // 서버에서 최신 아이템 데이터를 가져오는 비동기 요청
      const response = await fetch('/api/items'); // 예시: 실제 API 엔드포인트 사용
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const itemData = await response.json();
      setItems(itemData); // 최신 아이템 리스트로 업데이트
      setIsItemModalOpen(true); // 모달 열기
    } catch (error) {
      console.error('Error fetching items:', error);
      
    }
    setIsItemModalOpen(true);
  };

  // 항목 추가 모달 닫기
  const handleCloseItemModal = () => {
    setIsItemModalOpen(false);
  };

  // 항목 저장 및 폴더에 적용
  const handleSaveItem = () => {
    setFlatFolderData((prevFlatData) =>
      prevFlatData.map((folder) =>
        folder.id === selectedFolder
          ? { ...folder, itemId: selectedItemId } // 항목 ID만 저장
          : folder
      )
    );
    handleCloseItemModal();
  };
  ////////////////////////////////////////////////////////////////////////


  // 우클릭 이벤트 핸들러
  const handleContextMenu = (event) => {
    event.preventDefault();
    const rowId = event.currentTarget.getAttribute("data-id");

    setRowSelectionModel((prevSelection) => {
      if (prevSelection.includes(rowId)) {
        // 이미 선택된 행이면 기존 선택을 유지
        return prevSelection;
      } else {
        // 새로운 행을 추가로 선택
        return [...prevSelection, rowId];
      }
    });
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };
  
  // 컨텍스트 메뉴 닫기
  const handleClose = () => {
    setRowModesModel((prevModel) => {
        const updatedModel = { ...prevModel };
        rows.forEach((row) => {
            updatedModel[row.id] = { mode: GridRowModes.View }; // 각 행의 모드를 View로 설정
        });
        return updatedModel;
    });
    setRowSelectionModel([]); // 선택된 행 초기화
    setContextMenu(null); // 컨텍스트 메뉴 닫기
};
  
// 파일 선택시 호출되는 핸들러
const handleFileUpload = (event) => {
  //백엔드에 axios요청
  const selectedFiles = Array.from(event.target.files); // 선택된 파일 배열로 변환
  //파일 정보를 백엔드로 부터 받아옴
  const newFiles = selectedFiles.map((file) => ({
    id: String(new Date().getTime()) + file.name, // 고유한 ID 생성
    label: file.name,
    isFolder: false,
    children: [],
    parentId:selectedFolder,
    lastModifiedUserId:"A",
    lastModifiedDate: new Date().toISOString()
  }));

  // 체크박스 선택 상태 초기화 (첫 번째 파일 선택)
  setRowSelectionModel([]);
  //파일 추가
  setFlatFolderData((prevFlatData) => [...prevFlatData, ...newFiles]);
  // 컨텍스트 메뉴 닫기
  handleClose();
};
const handleRename = () => {
  if (rowSelectionModel !== null && rowSelectionModel.length > 0) {
    const selectedId = rowSelectionModel[0]; // 다중 선택된 경우 첫 번째 선택된 행의 ID만 사용합니다.
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [selectedId]: { mode: GridRowModes.Edit }
    }));

  }

  // 컨텍스트 메뉴 닫기
  handleClose(); 
};
const handleCut = () => {
  if (rowSelectionModel.length > 0) {
    setCopyRows([])
    const selectedIds = rowSelectionModel;
    setCutRows(selectedIds); // 잘라내기 항목 저장
    setRowSelectionModel([]); // 선택 해제
    handleClose(); // 메뉴 닫기
  }
};
const handleCopy = () => {
  if (rowSelectionModel.length > 0) {
    setCutRows([])
    const selectedIds = rowSelectionModel;
    setCopyRows(selectedIds); // 복사 항목 저장
    setRowSelectionModel([]); // 선택 해제
    handleClose(); // 메뉴 닫기
    console.log("copy")
    console.log(copyRows)
  }
};
const handlePaste = () => {
  const getAllChildren = (parentId) => {
    let children = [];
    flatFolderMap.forEach((item) => {
      if (item.parentId === parentId) {
        children.push(item);
        children = children.concat(getAllChildren(item.id));
      }
    });
    return children;
  };

  if (cutRows.length > 0) {
    // cutRows에 있는 항목들과 그 자식들을 현재 선택된 폴더에 붙여넣기
    const itemsToMove = cutRows.flatMap(id => [flatFolderMap.get(id), ...getAllChildren(id)]);
    const updatedFlatData = Array.from(flatFolderMap.values()).map((item) => {
      if (cutRows.includes(item.id)) {
        return {
          ...item,
          parentId: selectedFolder, // 현재 선택된 폴더로 이동
          lastModifiedDate: new Date().toISOString(),
        };
      }
      return item;
    });

    setFlatFolderData(updatedFlatData);
    setCutRows([]); // 잘라내기 상태 초기화
    handleClose(); // 메뉴 닫기
  } else if (copyRows.length > 0) {
    // copyRows에 있는 항목들과 그 자식들을 현재 선택된 폴더에 복사하여 붙여넣기
    const itemsToCopy = copyRows.flatMap(id => [flatFolderMap.get(id), ...getAllChildren(id)]);
    const copiedItems = itemsToCopy.map((item) => {
      return {
        ...item,
        id: String(new Date().getTime()) + Math.random(), // 새로운 고유 ID 생성
        parentId: copyRows.includes(item.id) ? selectedFolder : item.parentId, // 부모 ID 설정
        label: item.parentId === null ? `${item.label}_copy` : item.label, // 최상위 항목에만 '_copy' 추가
        lastModifiedDate: new Date().toISOString(),
      };
    });

    setFlatFolderData((prevFlatData) => [...prevFlatData, ...copiedItems]);
    setCopyRows([]); // 복사 상태 초기화
    handleClose(); // 메뉴 닫기
  }
};


  const handleRowDoubleClick=(params)=>{
    const row = params.row;
    if (row.isFolder) {
      getSelectedFolderData(params.id);
      setSelectedFolder(params.id);
    } else {
      // 파일인 경우: 사이드 패널에 표시

    }
  }
  
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    console.log("handleRowEditStop")
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


  const processRowUpdate = async(newRow) => {
    console.log("processRowUpdate")
    try {
      const response = await axios.post(`project/name-modify`, {
        label: newRow.label,
        id: newRow.id
      }, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
  
      if (response.status === 200) {
        // 백엔드에서 받은 최신 데이터로 로우와 flatFolderData 업데이트
        const updatedRow = {
          ...newRow,
          lastModifiedUserId: response.data.item.lastModifiedUserId,
          lastModifiedDate: response.data.item.lastModifiedDate,
        };

        // flatFolderData 상태 업데이트
        setFlatFolderData((prevFlatData) =>
            prevFlatData.map((item) =>
                item.id === updatedRow.id ? { ...item, ...updatedDataFromBackend } : item
            )
        );

        // 입력 후 벗어나면 view 모드로 변경
        setRowModesModel((prev) => ({
          ...prev,
          [newRow.id]: { mode: GridRowModes.View },
        }));

        return updatedRow;
      }
    } catch (error) {
      console.error('Error updating row:', error);
      return newRow; // 실패 시 기존의 newRow 반환
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCreateNewFolder = async ()=>{
    // 새 폴더 만들기는 두번의 요청으로 이루어지게 함
    // 단순히 get요청으로 현재 폴더 위치에 default폴더를 생성
    //edit모드가 풀릴때 다시 요청 보내는 방식
    //const response ~~~
    try {
      let select=selectedFolder;
      if (selectedFolder === null){
        select=0
      }
      const response=await axios.post("http://localhost:9090/project/create-folder",select,{
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`, // 토큰 필요 시 추가
        }
      });
      if (response.status === 200){
        // rows 상태 업데이트, flatdata가 비동기 업데이트기 때문에 우선 포커스 용으로 row상태 업데이트
        setRows([...rows, response.data.item]);
        setFlatFolderData([...flatFolderData,response.data.item]);
        // 체크박스 선택 상태 초기화
        setRowSelectionModel([response.data.item.id]); // 새로 생성한 폴더 선택

        // 새 폴더 행을 편집 모드로 설정
        setRowModesModel((prevModel) => ({
          ...prevModel,
          [response.data.item.id]: { mode: GridRowModes.Edit }, // 편집 모드로 전환
        }));


        apiRef.current.setCellFocus(response.data.item.id, 'label');
      }
    }
    catch(error){

    }
    // const newFolder = {
    //   id: String(new Date().getTime()), // 사용할 아이디를 백단에서 받아옴, 지금은 임시 값
    //   label: 'New Folder', // 기본 폴더 이름
    //   isFolder: true,
    //   parentId:selectedFolder
    // };


    // 컨텍스트 메뉴 닫기
    handleClose();
  }
  const handleDelete = async (e) => {
    if (rowSelectionModel.length > 0) {
      try {
        // 삭제 요청을 POST로 보냄,삭제 데이터가 여러개
        const response = await axios.post('project/delete', {
          ids: rowSelectionModel, // 선택된 폴더의 ID들을 data로 넘김
        }, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
          },
        });

        if (response.status === 200) {
          // 성공적으로 삭제된 경우, 클라이언트에도 반영
          const selectedIds = rowSelectionModel;

          // flatFolderData 상태에서 선택된 항목들을 제거
          setFlatFolderData(prevFlatData =>
              prevFlatData.filter(item => !selectedIds.includes(item.id))
          );

          // 삭제 후 선택된 행 초기화
          setRowSelectionModel([]);
        }
      } catch (error) {
        console.error('Error deleting folders:', error);
      }

      // 컨텍스트 메뉴 닫기
      handleClose();
    }
  };


  const handleGoToParentFolder = () => {
    if (selectedFolder !== null) {
      // 현재 선택된 폴더의 부모를 찾기
      const currentFolder = flatFolderData.find(folder => folder.id === selectedFolder);
  
      if (currentFolder && currentFolder.parentId !== null) {
        // 부모 폴더가 존재하는 경우 상위 폴더로 이동
        setSelectedFolder(currentFolder.parentId);
      } else {
        // 부모가 없는 경우 루트 폴더입니다.
        setSelectedFolder(null);
      }
    }
  };

  // 커스텀 툴바 컴포넌트 정의
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
        <Button variant="contained" component="label" sx={{ m: 1 }}>
          파일 업로드
          <input type="file" hidden multiple accept=".pdf" onChange={handleFileUpload} />
        </Button>
        <Button variant="contained" component="label" disabled={selectedFolder === null} sx={{ m: 1 }} onClick={handleCreateNewFolder}>
          새 폴더
        </Button>
        <Button variant="contained" component="label" sx={{ m: 1 }} onClick={handlePaste} disabled={cutRows < 1 && copyRows < 1}>
          붙여넣기
        </Button>
        <Button 
          variant="contained" 
          onClick={handleGoToParentFolder} 
          startIcon={<ArrowBackIcon />} 
          sx={{ m: 1 }}
          disabled={selectedFolder === null} // 루트 폴더에서는 비활성화
        >
          상위 폴더로 이동
        </Button>
        <Button variant="contained" onClick={handleOpenConversionModal}>
          변환 목록
        </Button>
        <Button variant="contained" onClick={()=>console.log(folderData)}>
          현재 폴더 구조
        </Button>
      </GridToolbarContainer>
    );
  };

  
  

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column',height: 'calc(100vh - 100px)' }}>
        <Box flexGrow={1} height="100%">
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
              height: "100%",
              '& .MuiDataGrid-virtualScroller': {
                overflowY: 'scroll',
              },
              '& .MuiDataGrid-footerContainer': {
                display: 'none',
              },
            }}
          />
        </Box>
      </Box>
      <Dialog open={isConversionModalOpen} onClose={handleCloseConversionModal} fullWidth maxWidth="sm">
        <DialogTitle>변환 목록</DialogTitle>
        <DialogContent>
          <InfiniteScroll
            dataLength={conversionList.length}
            next={() => {}}
            hasMore={false} // 무한 스크롤이 필요 없는 경우 false로 설정
            height={400}
            loader={<CircularProgress />}
          >
            <List>
              {conversionList.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.label} />
                  <IconButton onClick={() => handleRemoveFromConversionList(item.id)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </InfiniteScroll>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConversionModal}>닫기</Button>
          <Button variant="contained" onClick={() => {
            // 변환 작업을 서버에 요청하는 로직 추가
            console.log('서버로 변환 요청:', conversionList);
            handleCloseConversionModal();
          }}>
            변환 시작
          </Button>
        </DialogActions>
      </Dialog>
      <ItemSettingsModal
        open={isItemModalOpen}
        onClose={handleCloseItemModal}
        onSave={handleSaveItem}
        items={items} // 최신 아이템 리스트를 모달에 전달
        setSelectedItem={setSelectedItemId}
        selectedItem={selectedItemId}
      />
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
        {rowSelectionModel.length === 1 && (
        <MenuItem onClick={handleRename}>이름 수정</MenuItem>
        )}
         <MenuItem onClick={handleDelete}>삭제</MenuItem>
        <MenuItem onClick={handleCut}>자르기</MenuItem>
        <MenuItem onClick={handleCopy}>복사</MenuItem>
        <MenuItem onClick={handleOpenItemModal}>항목 지정</MenuItem>
        <MenuItem onClick={handleAddToConversion}>변환 목록 추가</MenuItem>
      </Menu>

    
    </>
  );
}
