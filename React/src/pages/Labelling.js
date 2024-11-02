import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchComponent from '../components/labelling/SearchComponent';
import CustomTreeView from '../components/labelling/TreeView';
import DataGridDemo from '../components/TableLabel';
import { useDispatch } from 'react-redux';
import { clearFolders, clearTableData } from '../slices/labelTableSlice';
import { setSelectedCategory1, setSelectedWorkStatus } from '../slices/searchSlice';

const LabellingContainer = styled.div`
  display: flex;
  overflow: auto;
  height: calc(100% - 4.625rem);
`;

const ContentContainer = styled.div`
  display: flex;
  position: relative;
  margin: 2% 5%;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3%;
`;

const RefreshButton = styled.button`
  background-color: white;
  color: #717171;
  border: none;
  padding: 5.5px 10px;
  border-radius: 0.3rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  font-size: 12px;
  margin-right: 10px; /* SearchComponent와의 간격 */
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

const SidebarContainer = styled.div`
  /* 사이드바 스타일을 추가할 수 있습니다 */
`;

const TableContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const Labelling = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearFolders()); // 이전 폴더 데이터 초기화
    };
  }, []);

  const handleRefreshClick = () => {
    dispatch(setSelectedCategory1(""));
    dispatch(setSelectedWorkStatus(""));
  };

  return (
    <LabellingContainer>
      <SidebarContainer>
          <CustomTreeView />
      </SidebarContainer>

      <ContentContainer>
        <SearchContainer>
          <RefreshButton onClick={handleRefreshClick}>
            <img src='/icons/refresh_icon.svg' alt="search_refresh" />
          </RefreshButton>
          <SearchComponent/>
        </SearchContainer>

        <TableContainer>
            <DataGridDemo />
        </TableContainer>
      </ContentContainer>
    </LabellingContainer>
  );
};

export default Labelling;
