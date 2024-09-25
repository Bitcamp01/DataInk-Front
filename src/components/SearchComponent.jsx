import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import '../css/labelling-search.css'; // CSS 파일 연결

const SearchComponent = () => {
  const dateOptions = [
    { label: 'Today', value: 'today' },
    { label: 'This week', value: 'this-week' },
    { label: 'This month', value: 'this-month' },
    { label: 'This year', value: 'this-year' },
    { label: 'Set up', value: 'set-up' },
  ];

  const workerOptions = [
    { label: '작업인원 1', value: 'worker1' },
    { label: '작업인원 2', value: 'worker2' },
  ];

  const categoryOptions = [
    { label: '카테고리 1', value: 'category1' },
    { label: '카테고리 2', value: 'category2' },
  ];

  const subcategoryOptions = [
    { label: '서브카테고리 1', value: 'subcategory1' },
    { label: '서브카테고리 2', value: 'subcategory2' },
  ];

  return (
    <div className="search">
      <div className="search__filters">
        <div className="search__group">
          {/* 게시날짜 커스텀 드롭다운 */}
          <CustomDropdown label="게시날짜" options={dateOptions} name="date" />

          {/* 작업인원 커스텀 드롭다운 */}
          <CustomDropdown label="작업인원" options={workerOptions} name="worker" />
        </div>

        <div className="search__divider"></div>

        <div className="search__group">
          {/* 대분류 커스텀 드롭다운 */}
          <CustomDropdown label="대분류" options={categoryOptions} name="category" />

          {/* 중분류 커스텀 드롭다운 */}
          <CustomDropdown label="중분류" options={subcategoryOptions} name="subcategory" />
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