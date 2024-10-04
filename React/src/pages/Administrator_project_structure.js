import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomizedTreeView from '../components/CustomizedTreeView';
import CustomizedDataGrid from '../components/CustomizedDataGrid';





export default function MainGrid() {
  //클라이언트 단에서 가지는 프로젝트 구조로 서버에서 모든 구조를 다시 받지 않고도 수정된 구조를 얻기 위해 사용됨
  //초기에 files는 빈 배열로 하는 전체 프로젝트 구조를 가져옴
  const initialFolderData = [
    {
      id: '0',
      label: "root",
      isFolder: true, // 폴더 여부 추가
      children: [
        {
          id: '2',
          label: "folder1",
          isFolder: true, // 폴더 여부 추가
          children: [
            {
              id: '3',
              label: "subfolder1",
              isFolder: true, // 폴더 여부 추가
              children: [
                { id: 'file11', label: 'file1.txt', isFolder: false, children: [] }, // 파일에도 children 추가
                { id: 'file21', label: 'file2.txt', isFolder: false, children: [] }, // 동일 구조 유지
                
              ],
            },
            { id: 'file31', label: 'file3.txt', isFolder: false, children: [] }, // 파일도 동일한 구조
            { id: 'file41', label: 'file4.txt', isFolder: false, children: [] },
          ],
          
        },
        {
          id: '4',
          label: "folder12",
          isFolder: true, // 폴더 여부 추가
          children: [
            {
              id: '5',
              label: "subfolder1",
              isFolder: true, // 폴더 여부 추가
              children: [
                { id: 'file1', label: 'file1.txt', isFolder: false, children: [] }, // 파일에도 children 추가
                { id: 'file2', label: 'file2.txt', isFolder: false, children: [] }, // 동일 구조 유지
              ],
            },
            { id: 'file3', label: 'file3.txt', isFolder: false, children: [] }, // 파일도 동일한 구조
            { id: 'file4', label: 'file4.txt', isFolder: false, children: [] },
          ],
          
        },
        { id: 'file5', label: 'file5.txt', isFolder: false, children: [] },
        { id: 'file6', label: 'file6.txt', isFolder: false, children: [] },
      ],
  
    }
  ];
  const [folderData, setFolderData] = React.useState([]); //트리뷰에서 사용할 전체 폴더 구조 데이터
  const [selectedFolder, setSelectedFolder] = React.useState(null); // 현재 선택된 폴더, 트리뷰와 데이터 그리드의 선택 된 폴더 동기화에 이용

  // maingird데이터 수정은 setfolderdata로 수정할 것이기 때문에 필요 없음, 또한 선택 자체는 datagrid에서만 사용될 것
  // const [selectedItems, setSelectedItems] = React.useState([]); // 선택된 폴더/파일의 목록  maingrid에서 관리하는 데이터의 수정에 이용될 것
  
  //폴더 선택시 해당 폴더를 선택 했음을 maingrid에서 공유 관리
  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder.id); // 선택된 폴더 아이디, 폴더,파일 포함하여 고유한 값을 가지는 값으로 현재 선택된 폴더를 구분
  };
  //초기화면 구성시 서버로부터 프로젝트 구조 가져오기, 백엔드 구현시 요청하는 코드로 변경 필요
  React.useEffect(()=>{
    setFolderData(initialFolderData);
  },[])
  React.useEffect(()=>{
    console.log(folderData)
  },[folderData])
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
    
    
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        프로젝트 구조 관리
      </Typography>
      <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView folderData={folderData} onFolderSelect={handleFolderSelect} setFolderData={setFolderData}/>
          </Stack>
        </Grid>
        <Grid size={{ md: 12, lg: 9 }}>
          {/*  트리뷰와 공유할 현재 선택된 폴더 정보, 폴더 데이터 변경에 사용할 set함수  */}
          <CustomizedDataGrid folderData={folderData} selectedFolder={selectedFolder} setFolderData={setFolderData}/>
        </Grid>
      </Grid>
      
    </Box>
  );
}
