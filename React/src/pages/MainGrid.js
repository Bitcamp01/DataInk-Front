import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomizedTreeView from '../components/adminProjectStructure/CustomizedTreeView';
import CustomizedDataGrid from '../components/adminProjectStructure/CustomizedDataGrid';
import axios from "axios";


// 트리 데이터를 Flat 데이터로 변환하는 함수
export function flattenTree(treeData, parentId = null) {
  let flatData = [];
  treeData.forEach((item) => {
    flatData.push({
      id: item.id,
      parentId: parentId, // 트리 구조를 평탄화할 때 계산된 parentId
      label: item.label,
      isFolder: item.isFolder,
      itemId: item.itemId, // 추가된 필드
      lastModifiedUserId: item.lastModifiedUserId, // 추가된 필드
      lastModifiedDate: item.lastModifiedDate,
      finished: item.finished, // 추가된 필드
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
    lookup[item.id] = {
      ...item,
      children: []  // 트리 구조로 변환할 때 자식 노드를 위한 배열 추가
    };
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
  const getInitFolderData= async () =>{
    try {
      const response=await axios.get("http://localhost:9090/project",{
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      })
      if (response.status === 200){
        setFolderData(response.data.items);
      }
    }
    catch(err){

    }
  }
  const updateFlatFolderData = (newData) => {
    setFlatFolderData((prevFlatData) => {
      const lookup = new Map(prevFlatData.map(item => [item.id, item]));

      // 기존에 있던 데이터와 새로 받아온 데이터의 병합
      newData.forEach((newItem) => {
        if (lookup.has(newItem.id)) {
          lookup.set(newItem.id, { ...lookup.get(newItem.id), ...newItem });
        } else {
          lookup.set(newItem.id, newItem);
        }
      });

      // 새로 받아온 데이터에는 없고 기존 데이터에는 있는 항목들을 제거
      const updatedFlatData = Array.from(lookup.values()).filter(item =>
          newData.some(newItem => newItem.id === item.id)
      );

      return updatedFlatData;
    });
  };



  const getSelectedFolderData = async (selectFolder) => {
    try {
      const response = await axios.get(`http://localhost:9090/project/${selectFolder}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`, // 토큰 필요 시 추가
        }
      });
      if (response.status === 200) {
        // 서버로부터 받아온 데이터가 response.data.items라고 가정하고 업데이트합니다.
        updateFlatFolderData(response.data.items);
      }
    } catch (err) {
      console.error("Error fetching selected folder data:", err);
    }
  };
  React.useEffect(()=>{
    getInitFolderData();
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
      <Box sx={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Grid container spacing={2} columns={12} sx={{ flexGrow: 1 }}>
          <Grid size={{ xs: 12, lg: 3 }} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            {/* folderData는 전체 폴더 구조를 출력해야하는 트리뷰 입장에서 필요,setFlattenFolderData는 새로운 프로젝트 추가시 폴더 구조의 변경이 일어나는데 평탄화된
            폴더구조와 트리구조로 된 폴더 구조를 일치시키기 위해 사용, folderSelect는 선택한 폴더를 알아야 해당 부분의 정보를 datagrid와 공유 가능,
            setfolderData는 새로운 폴더 추가시 변경되는 폴더 구조 적용을 위해 사용  */}
            <CustomizedTreeView getSelectedFolderData={getSelectedFolderData}
                                handleTreeViewMouseEnter={handleTreeViewMouseEnter}
                                folderData={folderData}
                                setSelectedFolder={setSelectedFolder}
                                setFolderData={setFolderData}
                                setFlatFolderData={setFlatFolderData}/>

          </Stack>
        </Grid>
          <Grid size={{ md: 12, lg: 9 }} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {/* 메인 그리드가 초기에 받아와 관리하는 전체 구조, 트리뷰와 데이터 그리드의 동기화에 사용될 선택된 폴더,폴더 , 폴더 데이터 변경에 사용할 set함수  */}
          <CustomizedDataGrid getSelectedFolderData={getSelectedFolderData}
                              folderData={folderData}
                              setFolderData={setFolderData}
                              selectedFolder={selectedFolder}
                              setSelectedFolder={setSelectedFolder}
                              flatFolderData={flatFolderData}
                              setFlatFolderData={setFlatFolderData}
                              setShouldUpdateTree={setShouldUpdateTree}/>
        </Grid>
      </Grid>
    </Box>
  );
}
