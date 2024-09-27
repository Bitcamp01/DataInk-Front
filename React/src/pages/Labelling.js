import React from 'react';
import SearchComponent from '../components/labelling/SearchComponent';
import CustomTreeView from '../components/labelling/TreeView';
import DataGridDemo from '../components/Table_label';
import { Box } from '@mui/material';

const Labelling = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 4.625rem)',
        overflowY: 'auto',  // Labelling.js 전체에 스크롤 적용
      }}
    >
      
      <Box
        sx={{
          position: 'sticky',  // SearchComponent를 고정
          top: 20,
          flexShrink: 0,
          zIndex: 1000, 
        }}
      >
        <SearchComponent />
      </Box>

      {/* 사이드바와 테이블을 배치하는 영역 */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflowX: 'hidden' }}>
        
        {/* 사이드바 영역 - 왼쪽에 고정 */}
        <Box >
          <CustomTreeView />
        </Box>

        {/* 테이블 영역 - 중앙 정렬 및 좌우 스크롤 활성화 */}
        <Box sx={{ 
          flexGrow: 1, 
          marginLeft: '2rem', 
          marginTop: '8rem',
          display: 'flex', 
          justifyContent: 'center',  // 수평 가운데 정렬
          overflowY: 'auto',
        }}>
          <Box sx={{ minWidth: '100%'}}> {/* 테이블 크기 설정으로 스크롤 유도 */}
            <DataGridDemo />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Labelling;
