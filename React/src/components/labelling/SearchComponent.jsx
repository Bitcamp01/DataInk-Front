import '../../css/labelling-search.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomDropdown from './CustomDropdown';
import { setSelectedCategory1,setSelectedCategory2, setSelectedCategory3, setSelectedWorkStatus, setCategory2Options, 
  setCategory3Options } from '../../slices/searchSlice';
import { clearTableData, resetPage, setTableData } from '../../slices/labelTableSlice';
import { fetchSearchResults } from '../../apis/searchApis';

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
        if (childFolder.isFolder) {
          traverseFolder(childFolder, updatedParentLabels);
        }
      });
    }
  };

  folders.forEach((folder) => traverseFolder(folder));

  return categories;
};

// findFolderById 함수 (폴더 ID로 계층을 찾는 함수)
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

const SearchComponent = () => {
  const [searchKeywordInput, setSearchKeywordInput] = useState("");
  const dispatch = useDispatch();
  
  const selectedCategory1 = useSelector((state) => state.searchSlice.selectedCategory1);
  const selectedCategory2 = useSelector((state) => state.searchSlice.selectedCategory2);
  const selectedCategory3 = useSelector((state) => state.searchSlice.selectedCategory3);
  const selectedWorkStatus = useSelector((state) => state.searchSlice.selectedWorkStatus);
  const category2Options = useSelector((state) => state.searchSlice.category2Options);
  const category3Options = useSelector((state) => state.searchSlice.category3Options);
  const folderItems = useSelector((state) => state.labelTableSlice.items); 
  const categories = mapCategoriesFromFolders(folderItems);

  useEffect(() => {
    dispatch(setSelectedCategory1(""));
    dispatch(setSelectedWorkStatus(""));
  }, []);

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

  const handleSearch = async () => {
    dispatch(resetPage());
    const criteria = {
      category1: selectedCategory1,
      category2: selectedCategory2,
      category3: selectedCategory3,
      workStatus: selectedWorkStatus,
      searchKeyword: searchKeywordInput,
      folderItems: folderItems
    };

    // 설정된 검색 기준 콘솔에 출력
    console.log("Search Criteria:", criteria);
  
    try {
      // 검색 결과 가져오기
      const resultAction = await dispatch(fetchSearchResults(criteria));
      const searchResults = resultAction.payload;

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
            return '검토 완료';
          case 'approved':
            return '최종 승인됨';
          case 'rejected':
            return '반려됨';
          default:
            return '알 수 없음';
        }
      };
  
      if (searchResults.length === 0) {
        dispatch(clearTableData());
        alert("검색 결과가 없습니다.");
      } else {
        const mappedResults = searchResults.map((task, index) => {
          // 폴더 ID를 기준으로 카테고리 계층 정보 가져오기
          const { parentLabels } = findFolderById(folderItems, task.parentFolderId) || { parentLabels: [] };
          let category1 = parentLabels[0] || "";
          let category2 = parentLabels[1] || "";
          let category3 = parentLabels[2] || "";
  
          return {
            id: task.id,
            no: index + 1,
            workname: task.taskName,
            category1, // 대분류
            category2, // 중분류
            category3, // 소분류
            workstatus: getKoreanWorkStatus(task.status),
          };
        });
  
        dispatch(setTableData(mappedResults));
      }
    } catch (error) {
      console.error("검색 요청 중 오류 발생:", error);
      alert("검색 요청 중 오류가 발생했습니다.");
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
          <input 
            type="text" 
            className="search__input-field" 
            value={searchKeywordInput} 
            onChange={(e) => setSearchKeywordInput(e.target.value)}
            onKeyDown={handleKeyDown} // Enter 키 입력 이벤트 추가
            placeholder="검색어 입력" 
          />
        </div>

        <button className="search__button" onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
};

export default SearchComponent;
