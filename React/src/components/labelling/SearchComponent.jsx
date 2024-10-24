import '../../css/labelling-search.css';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomDropdown from './CustomDropdown';
import { setSelectedCategory1, setSelectedCategory2, setSelectedCategory3, setSelectedWorkStatus, setCategory2Options, setCategory3Options } from '../../slices/categorySlice';

const mapCategoriesFromFolders = (folders) => {
  const categories = [];

  const traverseFolder = (folder, parentLabels = []) => {
    const updatedParentLabels = [...parentLabels, folder.label];

    let category1 = updatedParentLabels[0] || '';  // 대분류
    let category2 = updatedParentLabels[1] || '';  // 중분류
    let category3 = updatedParentLabels[2] || '';  // 소분류

    categories.push({ category1, category2, category3 });

    if (folder.children && folder.children.length > 0) {
      folder.children.forEach((childFolder) => {
        if (childFolder.folder) {
          traverseFolder(childFolder, updatedParentLabels);
        }
      });
    }
  };

  folders.forEach((folder) => traverseFolder(folder));

  return categories;
};

const SearchComponent = () => {
  const dispatch = useDispatch();
  
  const selectedCategory1 = useSelector((state) => state.categorySlice.selectedCategory1);
  const selectedCategory2 = useSelector((state) => state.categorySlice.selectedCategory2);
  const selectedCategory3 = useSelector((state) => state.categorySlice.selectedCategory3);
  const selectedWorkStatus = useSelector((state) => state.categorySlice.selectedWorkStatus);
  const category2Options = useSelector((state) => state.categorySlice.category2Options);
  const category3Options = useSelector((state) => state.categorySlice.category3Options);

  const folderItems = useSelector((state) => state.labelTableSlice.items); 
  const categories = mapCategoriesFromFolders(folderItems);

  const category1Options = Array.from(new Set(categories.map(c => c.category1))).map(cat => ({
    label: cat,
    value: cat,
  }));

  const handleCategory1Change = (value) => {
    dispatch(setSelectedCategory1(value));

    const filteredCategory2Options = Array.from(new Set(
      categories.filter(c => c.category1 === value && c.category2).map(c => c.category2)
    )).filter(Boolean).map(cat => ({
      label: cat,
      value: cat,
    }));

    dispatch(setCategory2Options(filteredCategory2Options));
    dispatch(setCategory3Options([]));
  };

  const handleCategory2Change = (value) => {
    dispatch(setSelectedCategory2(value));

    const filteredCategory3Options = Array.from(new Set(
      categories.filter(c => c.category1 === selectedCategory1 && c.category2 === value).map(c => c.category3)
    )).filter(Boolean).map(cat => ({
      label: cat,
      value: cat,
    }));

    dispatch(setCategory3Options(filteredCategory3Options));
  };

  return (
    <div className="search">
      <div className="search__filters">
        <div className="search__group">
          {/* 대분류 커스텀 드롭다운 */}
          <CustomDropdown
            label="대분류"
            options={category1Options}
            name="category1"
            value={selectedCategory1}
            onChange={handleCategory1Change}
          />

          {/* 중분류 커스텀 드롭다운 */}
          <CustomDropdown
            label="중분류"
            options={category2Options}
            name="category2"
            value={selectedCategory2}
            onChange={handleCategory2Change}
            disabled={!selectedCategory1}
          />
        </div>

        <div className="search__divider"></div>

        <div className="search__group">
          {/* 소분류 커스텀 드롭다운 */}
          <CustomDropdown
            label="소분류"
            options={category3Options}
            name="category3"
            value={selectedCategory3}
            onChange={(value) => dispatch(setSelectedCategory3(value))}
            disabled={!selectedCategory2}
          />

          {/* 작업상태 커스텀 드롭다운 */}
          <CustomDropdown
            label="작업상태"
            options={[
              { label: '작업 중', value: 'in_progress' },
              { label: '제출됨', value: 'submitted' },
              { label: '검토 대기 중', value: 'pending' },
              { label: '검토 완료', value: 'reviewed' },
              { label: '승인됨', value: 'approved' },
              { label: '반려됨', value: 'rejected' },
            ]}
            name="workStatus"
            value={selectedWorkStatus}
            onChange={(value) => dispatch(setSelectedWorkStatus(value))}
          />
        </div>

        <div className="search__input">
          <input type="text" className="search__input-field" />
        </div>

        <button className="search__button">검색</button>
      </div>
    </div>
  );
};

export default SearchComponent;
