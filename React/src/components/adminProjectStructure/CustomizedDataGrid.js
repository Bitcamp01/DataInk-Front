import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid,GridRowEditStopReasons ,GridRowModes,apiRef,useGridApiRef,GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
    } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
  ListItemText,
  FormControlLabel, 
  Switch
} from '@mui/material'; // 누락된 컴포넌트들 import
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // Remove 아이콘 import
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios"; // InfiniteScroll 컴포넌트 import
import PdfModal from './PdfModal';

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
export default function CustomizedDataGrid({getSelectedFolderData,folderData,setSelectedProject,getInitFolderData,selectedProject,selectedFolder = null,setSelectedFolder,flatFolderData,setFlatFolderData}) {
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
  const [flatFolderMap, setFlatFolderMap] = useState(new Map(flatFolderData.map(item => [`${item.id}_${item.projectId}`, item])));


  useEffect(()=>{
    console.log(rowSelectionModel)
  },[rowSelectionModel])
  //데이터 그리드 영역 업데이트 부분
  useEffect(()=>{
    setRows(Array.from(flatFolderMap.values()).filter(item => item.parentId === selectedFolder));
  },[selectedFolder,selectedProject,flatFolderMap])

  // flatFolderData가 변경될 때 Map으로 업데이트
  useEffect(() => {
    setFlatFolderMap(new Map(flatFolderData.map(item => [`${item.id}_${item.projectId}`, item])));
  }, [flatFolderData]);
  ///////////////////////////////////////////////////////////////////////////////////
  const [conversionList, setConversionList] = useState([]); // 변환 목록
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const [includeIncomplete, setIncludeIncomplete] = useState(false);
  const [includeProjectStructure, setIncludeProjectStructure] = useState(false);

  const handleToggleIncomplete = () => setIncludeIncomplete((prev) => !prev);
  const handleToggleProjectStructure = () => setIncludeProjectStructure((prev) => !prev);
  const handleAddToConversion = () => {
    const selectedItems = rowSelectionModel.map(item=>item);
    console.log("convertList",conversionList)
    const newItems = selectedItems.filter(
      (item) => !conversionList.includes(item)
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
  const handleRemoveFromConversionList = (id) => {
    setConversionList((prevList) => prevList.filter((item) => item !== id ));
  };
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [items, setItems] = useState([]);
  
  // 항목 설정 모달 열기 (최신 아이템 리스트 로드)
  const handleOpenItemModal = async () => {
    try {

      // 서버에서 최신 아이템 데이터를 가져오는 비동기 요청
      const response = await axios.get(`${API_BASE_URL}/projects/items`,{
        headers :{
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      }); // 예시: 실제 API 엔드포인트 사용
      if (response.status == 200) {
        console.log(response.data)
        
      }
      setItems(response.data); // 최신 아이템 리스트로 업데이트
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
  const handleSaveItem = async () => {
    try{
      console.log("itemId",selectedItemId)
      console.log("선택 폴더",rowSelectionModel)
      const response=await axios.post(`${API_BASE_URL}/projects/item_select`,{
        selectedItemId : selectedItemId,
        selectedFolder : rowSelectionModel
      },
      {
        headers :{
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      })
    }
    catch(e){

    }
    setFlatFolderData((prevFlatData) =>
      prevFlatData.map((folder) =>
        folder.id === selectedFolder
            && folder.projectId === selectedProject
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
function convertFileUploadResponseToFileFormat(folderData) {
  return {
    id: folderData.id,  // ID 그대로 사용
    label: folderData.label,  // 파일명 그대로 사용
    itemId: folderData.itemIds ? folderData.itemIds[0] : null,  // itemIds의 첫 번째 항목 또는 기본값 설정
    parentId: selectedFolder,  // 현재 선택된 폴더 ID로 설정
    projectId: selectedProject,  // 현재 선택된 프로젝트 ID로 설정
    lastModifiedUserId: String(folderData.lastModifiedUserId),  // lastModifiedUserId는 문자열로 변환
    lastModifiedDate: folderData.lastModifiedDate,  // 마지막 수정 날짜 그대로 사용
    finished: folderData.finished,  // finished 그대로 사용
    children: [],  // children은 빈 배열로 초기화
    isFolder: folderData.isFolder  // 폴더 여부 그대로 사용
  };
}
// 파일 선택시 호출되는 핸들러
const handleFileUpload = async (event) => {
  const selectedFiles = Array.from(event.target.files); // 선택된 파일 배열로 변환

  const formData = new FormData();

  selectedFiles.forEach((file) => {
    formData.append("files", file); // "files"는 백엔드에서 받을 필드 이름
  });
  
  formData.append("selectedFolder", selectedFolder);
  formData.append("selectedProject", selectedProject);
  try {
    const response= await axios.post(`${API_BASE_URL}/projects/upload`, formData,{
      headers :{
        'Content-Type' : 'multipart/form-data',
        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
      }
    });
    const newFiles = response.data.map((fileData) => 
      convertFileUploadResponseToFileFormat(fileData)
    );
    
    setFlatFolderData((prevFlatData) => [...prevFlatData, ...newFiles]);
  }
  catch (e){

  }

  // 체크박스 선택 상태 초기화 (첫 번째 파일 선택)
  setRowSelectionModel([]);
  
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
//자르기 복사 시도 마다 이전 값 저장하지 않음
const handleCut = () => {
  if (rowSelectionModel.length > 0) {
    setCopyRows([]); // 복사 항목 초기화
    setCutRows([]);
    setCutRows(rowSelectionModel)

    setRowSelectionModel([]); // 선택 해제
    handleClose(); // 메뉴 닫기
  }
};

const handleCopy = () => {
  if (rowSelectionModel.length > 0) {
    setCopyRows([]);
    setCutRows([]); // 잘라내기 항목 초기화
    setCopyRows(rowSelectionModel);


    setRowSelectionModel([]); // 선택 해제
    handleClose(); // 메뉴 닫기
  }
};

  const handlePaste = async () => {
    if (cutRows.length > 0) {
      const response = await axios.post (`${API_BASE_URL}/projects/cut_paste`,cutRows,{
        params:{
          selectedFolder:selectedFolder,
          selectedProject:selectedProject
        }
        ,
        headers :{
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      })

      if (response.status === 200) {
        setFlatFolderData((prevFlatData) =>
          prevFlatData.map((item) => {
            // 자르기 한 로우의 id가 존재할 경우에만 처리
            const shouldUpdate = cutRows.some((row) => {
              if (row) {  // row와 row.id가 정의되어 있는지 확인
                const cutId = row.split("_")[0];  // 자르기 항목의 ID 부분 추출
                return item.id == cutId;
              }
              return false;
            });
            // 해당 item의 parentId를 selectedFolder로 변경
            return shouldUpdate ? { ...item, parentId: selectedFolder } : item;
          })
        );
      }
      setCutRows([]); // 잘라내기 상태 초기화
      handleClose(); // 메뉴 닫기
    } else if (copyRows.length > 0) {
      const response = await axios.post (`${API_BASE_URL}/projects/copy_paste`,copyRows,{
        params:{
          selectedFolder:selectedFolder,
          selectedProject:selectedProject
        }
        ,
        headers :{
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      })
      if (response.status === 200) {
        const newCopiedData = response.data.map((item) => convertFileUploadResponseToFileFormat(item));
      setFlatFolderData((prevFlatData) => [...prevFlatData, ...newCopiedData]);
      }

      setCopyRows([]); // 복사 상태 초기화
      handleClose(); // 메뉴 닫기
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenModal = async (label) => {
        setIsModalOpen(true);
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/projects/pdf/${label}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            console.log("url",response.data)
            setPdfUrl(response.data); // 서버에서 가져온 PDF URL 설정
        } catch (error) {
            console.error("Error fetching PDF URL:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPdfUrl(null); // 모달을 닫을 때 URL을 초기화
    };

  ////////////////////////////////////////////////////////////////////////////////////


  const handleRowDoubleClick=(params)=>{
    const row = params.row;
    if (row.isFolder) {
      setSelectedProject(row.projectId);
      setSelectedFolder(row.id);
    } else {
      handleOpenModal(row.label);
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

  const updateFolderDataById = (idToUpdate, updatedData) => {
    setFlatFolderData((prevFlatData) => 
      prevFlatData.map(item => 
        item.id == idToUpdate 
          ? { ...item, ...updatedData } // 특정 id가 일치하면 업데이트된 데이터를 병합
          : item // 그렇지 않으면 원래 데이터를 그대로 유지
      )
    );
  };
  const processRowUpdate = async(newRow) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projects/rename`, {
        label: newRow.label,
        selectedFolder: newRow.id,
        selectedProject:newRow.projectId
      }, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
  
      if (response.status === 200) {
        setRowModesModel((prev) => ({
          ...prev,
          [newRow.id]: { mode: GridRowModes.View },
        }));

      
        updateFolderDataById(response.data.id,{label: response.data.label,lastModifiedUserId: response.data.lastModifiedUserId,
          lastModifiedDate: response.data.lastModifiedDate})

        const updatedRow = {
          ...newRow, // 기존 newRow의 값
          label: response.data.label, // 서버에서 받아온 최신 값으로 업데이트
          lastModifiedUserId: response.data.lastModifiedUserId,
          lastModifiedDate: response.data.lastModifiedDate,
          // 필요에 따라 다른 필드도 추가
        };
        // 입력 후 벗어나면 view 모드로 변경
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
  const calculateFolderDepth = (folderId, flatFolderData) => {
    let depth = 0;
    let folder = flatFolderData.find(item => item.id === folderId);
    
    while (folder && folder.parentId) {
      depth++;
      folder = flatFolderData.find(item => item.id === folder.parentId);
    }
  
    return depth;
  };

  const handleCreateNewFolder = async () => {
    try {
      const response = await axios.post(
          `${API_BASE_URL}/projects/createfolder`,
          {
            selectedFolder: selectedFolder,
            selectedProject: selectedProject,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            }
          }
      );

      if (response.status === 200) {
        const saveFolder={
            id: response.data.id,
            parentId: selectedFolder,
            label: "NewFolder",
            isFolder: true,
            itemId:[],
            lastModifiedUserId: response.data.lastModifiedUserId,
            lastModifiedDate: response.data.lastModifiedDate,
            finished: false,
            projectId: selectedProject
        }
        setFlatFolderData((prevFlatData) => [...prevFlatData, saveFolder]);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    }

    // 컨텍스트 메뉴 닫기
    handleClose();
  };


  const handleDelete = async (e) => {
    console.log(rowSelectionModel)
    if (rowSelectionModel.length > 0) {
      try {
        const response = await axios.post(`${API_BASE_URL}/projects/delete`, {
          ids: rowSelectionModel, // 선택된 폴더의 ID들을 data로 넘김
        }, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
          },
        });

        if (response.status === 200) {
          // 성공적으로 삭제된 경우, 클라이언트에도 반영
          const selectedIds = rowSelectionModel.map((item) => item.split("_")[0]);
          console.log(selectedIds)
          console.log(flatFolderData)
          // flatFolderData 상태에서 선택된 항목들을 제거
          setFlatFolderData(prevFlatData =>
            prevFlatData.filter(item => !selectedIds.includes(String(item.id))) // id를 문자열로 변환
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
  const handleReloading = () =>{
    getInitFolderData();
  }

  // 커스텀 툴바 컴포넌트 정의
  const CustomToolbar = () => {
    const selectedFolderDepth = selectedFolder !== null ? calculateFolderDepth(selectedFolder, flatFolderData) : -1;
    return (
      <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <Button
        variant="contained"
        component="label"
        disabled={selectedFolder === null || selectedFolderDepth < 1}  // 깊이 2 이상이면 비활성화
        sx={{ m: 1 }}
      >
          파일 업로드
          <input type="file" hidden multiple accept=".pdf" onChange={handleFileUpload} />
        </Button>
        <Button variant="contained" component="label" disabled={selectedFolder === null} sx={{ m: 1 }} onClick={handleCreateNewFolder}>
          새 폴더
        </Button>
        <Button variant="contained" component="label" sx={{ m: 1 }} onClick={handlePaste} disabled={cutRows < 1 && copyRows < 1 || selectedFolderDepth < 1}>
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
        <Button variant="contained" onClick={async()=>{
          const response = await axios.get(`${API_BASE_URL}/projects/test`,{
            params:{
              projectId:67
            }
            ,
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            }
          })
          console.log(response);
        }}>
          현재 폴더 구조
        </Button>
        <Button variant="contained" onClick={handleReloading}>
          다시 로딩
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
            getRowId={(row) => `${row.id}_${row.projectId}`}
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
            onProcessRowUpdateError={(error) => {
              console.error("Row update error:", error);
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
      <PdfModal open={isModalOpen} onClose={handleCloseModal} pdfUrl={pdfUrl} />
      <Dialog open={isConversionModalOpen} onClose={handleCloseConversionModal} fullWidth maxWidth="sm">
        <DialogTitle>변환 목록</DialogTitle>
        <DialogContent>
          <InfiniteScroll
            dataLength={conversionList.length}
            next={() => {}}
            hasMore={false} 
            height={400}
            loader={<CircularProgress />}
          >
            <List>
              {conversionList.map((item) => (
                <ListItem key={item}>
                  <ListItemText primary={flatFolderMap.get(item).label} />
                  <IconButton onClick={() => handleRemoveFromConversionList(item)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </InfiniteScroll>
                <FormControlLabel
                    control={<Switch checked={includeProjectStructure} onChange={handleToggleProjectStructure} />}
                    label="프로젝트 구조 포함"
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConversionModal}>닫기</Button>
          <Button variant="contained" onClick={async () => {
            // 변환 작업을 서버에 요청하는 로직 추가
            console.log('서버로 변환 요청:', conversionList);
            const payload = {
              conversionList,
              includeProjectStructure
            };
            try {
                const response = await axios.post(`${API_BASE_URL}/projects/conversion`, payload, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    }
                });
                console.log(response.data); // 서버 응답 처리
            } catch (error) {
                console.error('Error during conversion:', error);
            }
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
        {rowSelectionModel.length === 1 && flatFolderMap.has(rowSelectionModel[0]) && 
          flatFolderMap.get(rowSelectionModel[0]).isFolder && (
        <MenuItem onClick={handleRename}>이름 수정</MenuItem>
        )}
        {selectedFolder !== null && (
        <MenuItem onClick={handleCut}>자르기</MenuItem>
        )}
        {selectedFolder !== null && (
        <MenuItem onClick={handleCopy}>복사</MenuItem>
        )}
        <MenuItem onClick={handleDelete}>삭제</MenuItem>
        <MenuItem onClick={handleOpenItemModal}>항목 지정</MenuItem>
        <MenuItem onClick={handleAddToConversion}>변환 목록 추가</MenuItem>
      </Menu>

    
    </>
  );
}
