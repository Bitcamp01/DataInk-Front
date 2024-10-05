import React from 'react';
import styled from 'styled-components';
import SearchComponent from '../components/labelling/SearchComponent';
import CustomTreeView from '../components/labelling/TreeView';
import DataGridDemo from '../components/TableLabel';

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
   margin-bottom: 3%;
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
  return (
    <LabellingContainer>
      <SidebarContainer>
          <CustomTreeView />
      </SidebarContainer>

      <ContentContainer>
        <SearchContainer>
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
