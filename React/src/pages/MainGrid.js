import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomizedTreeView from '../components/adminProjectStructure/CustomizedTreeView';
import CustomizedDataGrid from '../components/adminProjectStructure/CustomizedDataGrid';



// 트리 데이터를 Flat 데이터로 변환하는 함수
export function flattenTree(treeData, parentId = null) {
  let flatData = [];
  treeData.forEach((item) => {
    flatData.push({
      id: item.id,
      parentId: parentId,
      label: item.label,
      isFolder: item.isFolder,
      lastModifiedBy:item.lastModifiedBy,
      lastModifiedDate:item.lastModifiedDate
    });
    if (item.children && item.children.length > 0) {
      flatData = flatData.concat(flattenTree(item.children, item.id));
    }
  });

  return flatData;
}

// Flat 데이터를 트리 구조로 변환하는 함수
export function unflatten(flatData) {
  let tree = [];
  let lookup = {};

  flatData.forEach(item => {
    lookup[item.id] = { ...item, children: [] }; 
  });

  flatData.forEach(item => {
    if (item.parentId === null) {
      tree.push(lookup[item.id]);
    } else {
      if (lookup[item.parentId]) {
        lookup[item.parentId].children.push(lookup[item.id]);
      }
    }
  });

  return tree;
}


export default function MainGrid() {
  //클라이언트 단에서 가지는 프로젝트 구조로 서버에서 모든 구조를 다시 받지 않고도 수정된 구조를 얻기 위해 사용됨
  const initialFolderData = [
        
  ];
  const [folderData, setFolderData] = React.useState([]); //트리뷰에서 사용할 전체 폴더 구조 데이터
  const [selectedFolder, setSelectedFolder] = React.useState(null); // 현재 선택된 폴더, 트리뷰와 데이터 그리드의 선택 된 폴더 동기화에 이용,선택한 폴더,파일의 id를 가지고 있음
  const [flatFolderData,setFlatFolderData] = React.useState([]);// folderData를 대신해 전체 구조를 표현하고 관리할 부분
  const [shouldUpdateTree, setShouldUpdateTree] = React.useState(false); // 트리 갱신 필요 여부
  //초기화면 구성시 서버로부터 프로젝트 구조 가져오기, 백엔드 구현시 요청하는 코드로 변경 필요
  React.useEffect(()=>{
    setFolderData(initialFolderData);
  },[])

  React.useEffect(()=>{
    setFlatFolderData(flattenTree(initialFolderData))
  },[])
  React.useEffect(()=>{
    setShouldUpdateTree(true);
  },[flatFolderData])
  const handleTreeViewMouseEnter = () => {
    console.log("asdasd")
    if (shouldUpdateTree) {
      const newTreeData = unflatten(flatFolderData);
      setFolderData(newTreeData);
      setShouldUpdateTree(false); // 갱신 후 더 이상 갱신이 필요 없다고 설정
    }
  };
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            {/* folderData는 전체 폴더 구조를 출력해야하는 트리뷰 입장에서 필요,setFlattenFolderData는 새로운 프로젝트 추가시 폴더 구조의 변경이 일어나는데 평탄화된
            폴더구조와 트리구조로 된 폴더 구조를 일치시키기 위해 사용, folderSelect는 선택한 폴더를 알아야 해당 부분의 정보를 datagrid와 공유 가능,
            setfolderData는 새로운 폴더 추가시 변경되는 폴더 구조 적용을 위해 사용  */}
            <CustomizedTreeView handleTreeViewMouseEnter={handleTreeViewMouseEnter} folderData={folderData}  setSelectedFolder={setSelectedFolder} setFolderData={setFolderData} setFlatFolderData={setFlatFolderData}/>

          </Stack>
        </Grid>
        <Grid size={{ md: 12, lg: 9 }}>
          {/* 메인 그리드가 초기에 받아와 관리하는 전체 구조, 트리뷰와 데이터 그리드의 동기화에 사용될 선택된 폴더,폴더 , 폴더 데이터 변경에 사용할 set함수  */}
          <CustomizedDataGrid folderData={folderData} setFolderData={setFolderData} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} 
           flatFolderData={flatFolderData} setFlatFolderData={setFlatFolderData} setShouldUpdateTree={setShouldUpdateTree}/>
        </Grid>
      </Grid>
    </Box>
  );
}
