import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';

const initialFolderData = [
  {
    id: '1',
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
    ],
    files: [
      { id: 'file5', label: 'file5.txt', isFolder: false, children: [] },
      { id: 'file6', label: 'file6.txt', isFolder: false, children: [] },
    ], 
  }
];



export default function MainGrid() {
  const [folderData, setFolderData] = React.useState(initialFolderData); //트리뷰에서 사용할 전체 폴더 구조 데이터
  const [selectedItems, setSelectedItems] = React.useState([]); // 선택된 폴더/파일의 목록
  const [selectedFolder, setSelectedFolder] = React.useState(null); // 현재 선택된 폴더
  const [filePreview, setFilePreview] = React.useState(null); // 파일 미리보기 상태
  const [selectedFolderData, setselectedFolderData] = React.useState(null); // 현재 선택된 폴더 내부 데이터
  // 폴더 선택 시 하위 폴더 및 파일을 출력
  const handleFolderSelect = (folder) => {
    const items = [...(folder.children || []), ...(folder.files || [])]; // 폴더 및 파일 합침
    setSelectedItems(items);
    setSelectedFolder(folder.label); // 선택된 폴더 이름
  };

  // 아이템 클릭 시: 파일은 미리보기, 폴더는 하위 항목 출력
  const handleItemSelect = (item) => {
    if (typeof item === 'string') {
      // 파일 클릭 시 미리보기
      setFilePreview(item);
    } else {
      // 폴더 클릭 시 하위 항목 출력
      handleFolderSelect(item);
    }
  };
  React.useEffect(()=>{
    setselectedFolderData(initialFolderData);
  },[])
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
    
    
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        프로젝트 구조 관리
      </Typography>
      <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView folderData={folderData} onFolderSelect={handleFolderSelect}/>
          </Stack>
        </Grid>
        <Grid size={{ md: 12, lg: 9 }}>
          <CustomizedDataGrid folderData={selectedFolderData}  items={selectedItems} onItemSelect={handleItemSelect}/>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
      {/* 파일 미리보기 모달 */}
      {filePreview && (
        <div>
          <h3>{filePreview} 미리보기</h3>
          <p>파일 미리보기 내용이 여기에 표시됩니다.</p>
          <button onClick={() => setFilePreview(null)}>닫기</button>
        </div>
      )}
    </Box>
  );
}
