import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import '../../css/tree-view.css';
import { fetchFolders } from '../../apis/labelTableApis';

const TreeView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isRotated, setIsRotated] = useState(false);

  const dispatch = useDispatch();
  const projectId = useSelector((state) => state.labelTableSlice.projectId); // projectId를 가져옴
  const folders = useSelector((state) => state.labelTableSlice.items);

  // 버튼 클릭 시 토글
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsRotated(!isRotated);
  };

  useEffect(() => {
    if (projectId) {
      dispatch(fetchFolders(projectId)); // 프로젝트 ID로 폴더 데이터 불러옴
    }
  }, [dispatch, projectId]);

  const transformFolderData = (folders) => {
    return folders
      .filter(folder => folder.folder)  // folder가 true인 항목만 반환 (isFolder가 아니라 folder가 반환되는 상황)
      .map(folder => ({
        id: folder.id,
        label: folder.label,
        children: folder.children ? transformFolderData(folder.children) : [],  // 재귀적으로 하위 폴더 처리
      }));
  };

  // 데이터를 변환하여 원하는 구조로 변경
  const transformedItems = transformFolderData(folders);

  // const ITEMS = [
  //   {
  //     id: 'project1',
  //     label: '프로젝트 1',
  //     children: [
  //       {
  //         id: 'category1',
  //         label: '카테고리 1',
  //         children: [
  //           { id: 'folder1', label: '폴더 1', checkable: true },
  //           { id: 'folder2', label: '폴더 2', checkable: true },
  //           { id: 'folder3', label: '폴더 3', checkable: true },
  //         ],
  //       },
  //       {
  //         id: 'category2',
  //         label: '카테고리 2',
  //         children: [
  //           { id: 'folder4', label: '폴더 4', checkable: true },
  //           { id: 'folder5', label: '폴더 5', checkable: true },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 'project2',
  //     label: '프로젝트 2',
  //     children: [
  //       {
  //         id: 'category3',
  //         label: '카테고리 3',
  //         children: [
  //           { id: 'folder6', label: '폴더 6', checkable: true },
  //           { id: 'folder7', label: '폴더 7', checkable: true },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className="tree-container"
      style={{
        width: isVisible ? '15.6rem' : '0', // isVisible에 따라 width 제어
      }}
    >
      {/* search-bar와 RichTreeView가 isVisible 값에 따라 렌더링 */}
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
          <RichTreeView items={transformedItems} />
        </>
      )}

      {/* 버튼을 누르면 가시성을 토글 */}
      <button className="side-button" onClick={toggleVisibility}>
        <img 
          src="/icons/back_icon.svg" 
          alt="Side Button"
          style={{
            transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)', // 클릭에 따라 회전 상태를 변경
          }}
        />
      </button>
    </div>
  );
};

export default TreeView;
