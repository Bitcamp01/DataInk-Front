import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import '../../css/tree-view.css';
import { fetchFolders, fetchProjectEndDate, fetchTasksByFolderId } from '../../apis/labelTableApis';
import { clearFolders, resetPage, setTableData } from '../../slices/labelTableSlice';

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
      dispatch(clearFolders()); // 이전 폴더 데이터 초기화
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
  dispatch(resetPage());
  const { folder, parentLabels: updatedParentLabels } = findFolderById(folders, folderId, parentLabels);

  if (!folder || !folder.id) {
    console.error("Folder or Folder ID is undefined:", folder);
    return; // 폴더나 폴더 ID가 없으면 함수 종료
  }

  // children 중 하나라도 folder 속성이 true이면 함수 종료 (즉, 하위 폴더가 있을 경우 처리하지 않음)
  const hasSubFolder = folder.children && folder.children.some(child => child.folder === true);
  if (hasSubFolder) {
    return; // 하위 폴더가 있는 경우 함수 종료
  }

  try {
    // API 호출을 통해 파일(Task) 목록과 프로젝트 마감일을 가져옴
    const resultAction = await dispatch(fetchTasksByFolderId(folder.id));
    const tasks = resultAction.payload;

    const projectEndDateAction = await dispatch(fetchProjectEndDate(projectId));
    const projectEndDate = projectEndDateAction.payload;

    // 상태 값을 한글로 변환하는 함수
    const getKoreanWorkStatus = (status) => {
      switch (status) {
        case 'in_progress':
          return '작업 중';
        case 'submitted':
          return '제출됨';
        case 'pending':
          return '검토 대기중';
        case 'reviewed':
          return '검토 완료됨';
        case 'approved':
          return '최종 승인됨';
        case 'rejected':
          return '반려됨';
        default:
          return '알 수 없음';
      }
    };

    // 파일(Task) 데이터를 대분류, 중분류, 소분류에 맞춰 매핑
    const folderFiles = tasks.map((task, index) => {
      // updatedParentLabels의 길이에 따른 카테고리 설정
      let category1 = '';
      let category2 = '';
      let category3 = '';
    
      if (updatedParentLabels.length === 0) {
        category1 = folder.label;  // updatedParentLabels가 비어 있으면 folder.label을 category1에 설정
      } else if (updatedParentLabels.length === 1) {
        category1 = updatedParentLabels[0];  // updatedParentLabels[0]이 대분류
        category2 = folder.label;  // category2에 folder.label
      } else if (updatedParentLabels.length === 2) {
        category1 = updatedParentLabels[0];  // updatedParentLabels[0]이 대분류
        category2 = updatedParentLabels[1];  // updatedParentLabels[1]이 중분류
        category3 = folder.label;  // category3에 folder.label
      } else {
        category1 = updatedParentLabels[0];  // updatedParentLabels[0]이 대분류
        category2 = updatedParentLabels[1];  // updatedParentLabels[1]이 중분류
        category3 = updatedParentLabels[2];  // updatedParentLabels[2]이 소분류
      }

      return {
        id: task.id,  // 실제 Task ID 저장 (검수 요청 시 사용)
        no: index + 1,  // 인덱스를 1부터 시작하도록 설정 (테이블 표시용)
        workname: task.taskName,
        category1,  // 대분류
        category2,  // 중분류
        category3,  // 소분류
        workstatus: getKoreanWorkStatus(task.status),  // 작업 상태
        deadline: projectEndDate || '마감일 없음',  // 프로젝트 마감일
      };
    });

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
            onItemClick={(event, node) => {
              handleFolderClick(node);} // 폴더 클릭 시 핸들러 실행
            }
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
