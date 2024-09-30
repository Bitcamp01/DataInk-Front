import React from 'react';
import styled from 'styled-components';
import SearchComponent from '../components/labelling/SearchComponent';
import CustomTreeView from '../components/labelling/TreeView';
import DataGridDemo from '../components/Table_label';

const LabellingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4.625rem);
  overflow-y: auto;
`;

const StickySearchContainer = styled.div`
  position: sticky;
  top: 20px;
  flex-shrink: 0;
  z-index: 1000;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SidebarContainer = styled.div`
  /* 사이드바 스타일을 추가할 수 있습니다 */
`;

const TableContainer = styled.div`
  flex-grow: 1;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 8rem;
  display: flex;
  justify-content: center;
`;

const InnerTableContainer = styled.div`
  min-width: 100%;
`;

const Labelling = () => {
  return (
    <LabellingContainer>
      <StickySearchContainer>
        <SearchComponent />
      </StickySearchContainer>

      <ContentContainer>
        <SidebarContainer>
          <CustomTreeView />
        </SidebarContainer>

        <TableContainer>
          <InnerTableContainer>
            <DataGridDemo />
          </InnerTableContainer>
        </TableContainer>
      </ContentContainer>
    </LabellingContainer>
  );
};

export default Labelling;
