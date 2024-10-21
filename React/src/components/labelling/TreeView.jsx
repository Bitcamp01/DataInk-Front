import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import '../../css/tree-view.css';
import { fetchFolders, fetchProjectEndDate, fetchTasksByFolderId } from '../../apis/labelTableApis';
import { setTableData } from '../../slices/labelTableSlice';

const TreeView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isRotated, setIsRotated] = useState(false);

  const dispatch = useDispatch();
  const projectId = useSelector((state) => state.labelTableSlice.projectId); // projectId를 가져옴
  const folders = useSelector((state) => state.labelTableSlice.items); // 폴더 데이터를 가져옴

  // 버튼 클릭 시 토글
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsRotated(!isRotated);
  };

  // 프로젝트 ID가 있을 때 폴더 데이터를 가져오는 API 호출
  useEffect(() => {
    if (projectId) {
      dispatch(fetchFolders(projectId)); // 프로젝트 ID로 폴더 데이터 불러옴
    }
  }, [dispatch, projectId]);

  // 폴더 데이터를 재귀적으로 변환하는 함수
  const transformFolderData = (folders) => {
    return folders
      .filter(folder => folder.folder)  // folder가 true인 항목만 반환
      .map(folder => ({
        id: folder.id,
        label: folder.label,
        folder,  // 폴더 객체를 함께 전달
        children: folder.children ? transformFolderData(folder.children) : [],  // 하위 폴더 처리
      }));
  };

  // 폴더 데이터 변환
  const transformedItems = transformFolderData(folders);

  // 폴더 ID로 폴더와 그 상위 폴더 경로를 찾기 위한 함수 수정
const findFolderById = (folders, folderId, parentLabels = []) => {
  for (const folder of folders) {
    if (folder.id === folderId) {
      // 현재 폴더가 맞으면 부모 레이블 배열을 반환
      return { folder, parentLabels };
    }
    if (folder.children && folder.children.length > 0) {
      const found = findFolderById(folder.children, folderId, [...parentLabels, folder.label]);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

// 폴더 클릭 시 처리 함수
const handleFolderClick = async (folderId, parentLabels = []) => {
  const { folder, parentLabels: updatedParentLabels } = findFolderById(folders, folderId, parentLabels);

  console.log("Selected folder:", folder);
  console.log("Selected Parentfolder:", updatedParentLabels); // 부모 계층 출력

  if (!folder || !folder.id) {
    console.error("Folder or Folder ID is undefined:", folder);
    return; // 폴더나 폴더 ID가 없으면 함수 종료
  }

  try {
    // API 호출을 통해 파일(Task) 목록과 프로젝트 마감일을 가져옴
    const resultAction = await dispatch(fetchTasksByFolderId(folder.id));
    const tasks = resultAction.payload;

    const projectEndDateAction = await dispatch(fetchProjectEndDate(projectId));
    const projectEndDate = projectEndDateAction.payload;

    // 파일(Task) 데이터를 대분류, 중분류, 소분류에 맞춰 매핑
    const folderFiles = tasks.map((task, index) => ({
     id: index + 1,  // 인덱스를 1부터 시작하도록 설정 (테이블 표시용)
      taskId: task.id,  // 실제 Task ID 저장 (검수 요청 시 사용)
      workname: task.taskName,
      category1: updatedParentLabels[0] || '',  // 대분류
      category2: updatedParentLabels[1] || '',  // 중분류
      category3: updatedParentLabels[2] || '',  // 소분류
      workstatus: task.status,  // 작업 상태
      deadline: projectEndDate || '마감일 없음',  // 프로젝트 마감일
    }));

    // 테이블 데이터를 전역 상태로 저장
    dispatch(setTableData(folderFiles));
  } catch (error) {
    console.error("Error fetching tasks or project end date:", error);
  }
};



  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className="tree-container"
      style={{
        width: isVisible ? '15.6rem' : '0', // isVisible 값에 따라 width 제어
      }}
    >
      {isVisible && (
        <>
          <div className="search-bar">
            <img src={`/icons/label-search_icon.svg`} alt="Label Search Icon" className="label-search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm} 
              onChange={handleSearch} 
              className="search-input"
            />
          </div>
          <RichTreeView 
            items={transformedItems}
            onItemClick={(event, node) => handleFolderClick(node)} // 폴더 클릭 시 핸들러 실행
          />
        </>
      )}

      <button className="side-button" onClick={toggleVisibility}>
        <img 
          src="/icons/back_icon.svg" 
          alt="Side Button"
          style={{
            transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)', // 클릭에 따라 회전 상태 변경
          }}
        />
      </button>
    </div>
  );
};

export default TreeView;
