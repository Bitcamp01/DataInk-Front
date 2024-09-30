import React, { useState } from 'react';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import '../../css/tree-view.css';

const TreeView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  // 버튼 클릭 시 토글
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const ITEMS = [
    {
      id: 'project1',
      label: '프로젝트 1',
      children: [
        {
          id: 'category1',
          label: '카테고리 1',
          children: [
            { id: 'folder1', label: '폴더 1', checkable: true },
            { id: 'folder2', label: '폴더 2', checkable: true },
            { id: 'folder3', label: '폴더 3', checkable: true },
          ],
        },
        {
          id: 'category2',
          label: '카테고리 2',
          children: [
            { id: 'folder4', label: '폴더 4', checkable: true },
            { id: 'folder5', label: '폴더 5', checkable: true },
          ],
        },
      ],
    },
    {
      id: 'project2',
      label: '프로젝트 2',
      children: [
        {
          id: 'category3',
          label: '카테고리 3',
          children: [
            { id: 'folder6', label: '폴더 6', checkable: true },
            { id: 'folder7', label: '폴더 7', checkable: true },
          ],
        },
      ],
    },
  ];

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
          <RichTreeView items={ITEMS} />
        </>
      )}

      {/* 버튼을 누르면 가시성을 토글 */}
      <button className="side-button" onClick={toggleVisibility}>
        <img src="/icons/back_icon.svg" alt="Side Button" />
      </button>
    </div>
  );
};

export default TreeView;
