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
  const userAuthen = useSelector((state) => state.userSlice.authen); // 유저 권한 가져옴

  // 버튼 클릭 시 토글
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsRotated(!isRotated);
  };

  // 프로젝트 ID가 있을 때 폴더 데이터를 가져오는 API 호출
  useEffect(() => {
    if (projectId) {
      dispatch(clearFolders()); // 이전 폴더 데이터 초기화
      dispatch(fetchFolders(projectId));
    }
  }, [dispatch, projectId]);

  // 폴더 데이터를 재귀적으로 변환하는 함수
  const transformFolderData = (folders) => {
    return folders
      .filter(folder => folder.isFolder)  // folder가 true인 항목만 반환
      .map(folder => ({
        id: folder.id,
        label: folder.label,
        folder,  // 폴더 객체를 함께 전달
        children: folder.children ? transformFolderData(folder.children) : [],  // 하위 폴더 처리
      }));
  };

  // 폴더 데이터 변환
  const transformedItems = transformFolderData(folders);

  console.log("transformedItems", transformedItems);

  // 폴더 ID로 폴더와 그 상위 폴더 경로를 찾기 위한 함수 수정
  const findFolderById = (folders, folderId, parentLabels = []) => {
    for (const folder of folders) {
      if (folder.id === folderId) {
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
      return;
    }

    const hasSubFolder = folder.children && folder.children.some(child => child.isFolder === true);
    if (hasSubFolder) {
      return;
    }

    try {
      const resultAction = await dispatch(fetchTasksByFolderId(folder.id));
      let tasks = resultAction.payload;

      // if (userAuthen === 'ROLE_USER') {
      //   tasks = tasks.filter(task => task.status === 'in_progress' || task.status === 'rejected');
      // } else if (userAuthen === 'ROLE_MANAGER') {
      //   tasks = tasks.filter(task => task.status === 'submitted' || task.status === 'pending');
      // } else if (userAuthen === 'ROLE_ADMIN') {
      //   tasks = tasks.filter(task => task.status === 'reviewed');
      // }

      const projectEndDateAction = await dispatch(fetchProjectEndDate(projectId));
      const projectEndDate = projectEndDateAction.payload;

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

      const folderFiles = tasks.map((task, index) => {
        let category1 = '';
        let category2 = '';
        let category3 = '';

        if (updatedParentLabels.length === 0) {
          category1 = folder.label;
        } else if (updatedParentLabels.length === 1) {
          category1 = updatedParentLabels[0];
          category2 = folder.label;
        } else if (updatedParentLabels.length === 2) {
          category1 = updatedParentLabels[0];
          category2 = updatedParentLabels[1];
          category3 = folder.label;
        } else {
          category1 = updatedParentLabels[0];
          category2 = updatedParentLabels[1];
          category3 = updatedParentLabels[2];
        }

        return {
          id: task.id,
          no: index + 1,
          workname: task.taskName,
          category1,
          category2,
          category3,
          workstatus: getKoreanWorkStatus(task.status),
          deadline: projectEndDate || '마감일 없음',
        };
      });

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
        width: isVisible ? '15.6rem' : '0',
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
              handleFolderClick(node);
            }}
          />
        </>
      )}

      <button className="side-button" onClick={toggleVisibility}>
        <img 
          src="/icons/back_icon.svg" 
          alt="Side Button"
          style={{
            transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
    </div>
  );
};

export default TreeView;
