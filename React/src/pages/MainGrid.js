import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CustomizedTreeView from '../components/adminProjectStructure/CustomizedTreeView';
import CustomizedDataGrid from '../components/adminProjectStructure/CustomizedDataGrid';
import axios from "axios";
import { wait } from '@testing-library/user-event/dist/utils';





export default function MainGrid() {

  const [originalFolderData, setOriginalFolderData] = React.useState([]);//실제 백엔드에서 받는 데이터
  const [folderData, setFolderData] = React.useState([]); //트리뷰에서 사용할 전체 폴더 구조 데이터
  const [flatFolderData,setFlatFolderData] = React.useState([]);// 데이터 그리드에서 사용할 전체 폴더 구조 데이터

  const [selectedProject, setSelectedProject] = React.useState(null); // 어떤 프로젝트를 선택하는지
  const [selectedFolder, setSelectedFolder] = React.useState(null); // 현재 선택된 폴더, 트리뷰와 데이터 그리드의 선택 된 폴더 동기화에 이용,선택한 폴더,파일의 id를 가지고 있음

// 트리 데이터를 Flat 데이터로 변환하는 함수
   function flattenTree(treeData, parentId = null,projectId=null) {
    let flatData = [];
    //실제로 백엔드에서 이런 식으로 넘어오지는 않음. 때문에 어떻게 해서든 이런 데이터 형식을 가지게 끔 변형해야 함
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
        workStatus: item.workStatus,
        projectId:projectId === null ? item.projectId : projectId
      });
      if (item.children && item.children.length > 0) {
        flatData = flatData.concat(flattenTree(item.children, item.id,projectId === null ? item.projectId : projectId));
      }

    });

    return flatData;
  }

   function unflatten(flatData) {
    let tree = [];
    let lookup = {};

    flatData.forEach(item => {
   
      const key = `${item.id}_${item.projectId}`
      lookup[key] = {
        ...item,
        children: [] 
      };
    });

    flatData.forEach(item => {
      const key =  `${item.id}_${item.projectId}`
      if (item.parentId === null) {
        tree.push(lookup[key]);
      } else {
        const parentKey = `${item.parentId}_${item.projectId}`;
        if (lookup[parentKey]) {
          lookup[parentKey].children.push(lookup[key]);
        }
      }
    });
  
    return tree;
  }
  //초기화면 구성시 서버로부터 프로젝트 구조 가져오기, 백엔드 구현시 요청하는 코드로 변경 필요
  const getInitFolderData= async () =>{
    try {
      const response=await axios.get("http://localhost:9090/projects/all",{
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      })
      if (response.status === 200){


        response.data.forEach(item => {
          const newFolder={
            id:item.projectId,
            label:item.name,
            children:item.folders,
            itemId:null,
            lastModifiedUserId:item.userId,
            lastModifiedDate:item.startDate,
            isFolder:true,
            parentId:null,
            finished:false,
            workStatus:"",
            projectId:item.projectId
          }
          setOriginalFolderData(prevData => [...prevData, newFolder]);
        })

      }
    }
    catch(err){

    }
  }
  const updateFlatFolderData = (newData) => {
 
    if (!Array.isArray(newData)) {
      console.error("newData is not an array", newData);
      return; // 배열이 아닐 경우 적절한 처리를 수행합니다.
    }
  
    setFlatFolderData((prevFlatData) => {
      const updatedFlatData = prevFlatData.map((item) => {
        // 새로운 데이터에서 id가 일치하는 항목 찾기
        const newItem = newData.find((newItem) => newItem.id === item.id);
  
        // 새로운 데이터가 있는 경우에만 업데이트, 그렇지 않으면 기존 데이터 유지
        if (newItem) {
          return {
            ...item, // 기존 데이터를 유지
            label: newItem.label, // 덮어쓸 필드
            isFolder: newItem.isFolder,
            itemId: newItem.itemId,
            lastModifiedUserId: newItem.lastModifiedUserId,
            lastModifiedDate: newItem.lastModifiedDate,
            finished: newItem.finished,
            workStatus: newItem.workStatus,
            // parentId와 projectId는 기존 값을 유지
          };
        }
        return item; // 새로운 데이터가 없으면 기존 데이터 그대로 유지
      });
  
      // 기존 데이터에 없는 새 항목을 추가
      newData.forEach((newItem) => {
        if (!prevFlatData.some((item) => item.id === newItem.id)) {
          updatedFlatData.push(newItem); // 새 항목 추가
        }
      });
  
      return updatedFlatData; // 배열 형태로 반환
    });
  
  };
  
  




  const getSelectedFolderData = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/projects/folder`, {
        params:{
          selectedFolder: selectedFolder,
          selectedProject: selectedProject
        }
        ,
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`, // 토큰 필요 시 추가
        }
      });
      if (response.status === 200) {

        // 서버로부터 받아온 데이터가 response.data.items라고 가정하고 업데이트합니다.
        updateFlatFolderData(flattenTree(response.data,null,selectedProject));
      }
    } catch (err) {
      console.error("Error fetching selected folder data:", err);
    }
  };
  //초기화//////////////////////
  React.useEffect(()=>{
    getSelectedFolderData();
  },[selectedFolder,selectedProject])
  React.useEffect(()=>{
    getInitFolderData();
  },[])
  //초기화//////////////////////
  React.useEffect(()=>{
    setFlatFolderData(flattenTree(originalFolderData))
  },[originalFolderData])
  React.useEffect(()=>{
    const newTreeData = unflatten(flatFolderData);
    setFolderData(newTreeData);
  },[flatFolderData])

  return (
      <Box sx={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Grid container spacing={2} columns={12} sx={{ flexGrow: 1 }}>
          <Grid size={{ xs: 12, lg: 3 }} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView getSelectedFolderData={getSelectedFolderData}
                                folderData={folderData}
                                setSelectedFolder={setSelectedFolder}
                                setFolderData={setFolderData}
                                setFlatFolderData={setFlatFolderData}
                                setSelectedProject={setSelectedProject}
                                selectedProject={selectedProject}/>

          </Stack>
        </Grid>
          <Grid size={{ md: 12, lg: 9 }} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CustomizedDataGrid getSelectedFolderData={getSelectedFolderData}
                              folderData={folderData}
                              setFolderData={setFolderData}
                              selectedFolder={selectedFolder}
                              setSelectedFolder={setSelectedFolder}
                              flatFolderData={flatFolderData}
                              setFlatFolderData={setFlatFolderData}
                              setSelectedProject={setSelectedProject}
                              selectedProject={selectedProject}
                              getInitFolderData={getInitFolderData}/>
        </Grid>
      </Grid>
    </Box>
  );
}
