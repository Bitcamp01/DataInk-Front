import React from 'react';
import SearchComponent from '../components/labelling/SearchComponent';
import CustomTreeView from '../components/labelling/TreeView';
import DataGridDemo from '../components/Table_label';
import { Box } from '@mui/material';

const Labelling = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* SearchComponent - 상단에 위치 */}
      <Box sx={{ flexShrink: 0 }}>
        <SearchComponent />
      </Box>

      {/* 사이드바와 테이블을 배치하는 영역 */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        
        {/* 사이드바 영역 - 왼쪽에 고정 */}
        <Box sx={{ width: '250px', minWidth: '200px', backgroundColor: '#f0f0f0', overflowY: 'auto' }}>
          <CustomTreeView />
        </Box>

        {/* 테이블 영역 - 중앙 정렬 및 좌우 스크롤 활성화 */}
        <Box sx={{ 
          flexGrow: 1, 
          marginLeft: '2rem', 
          display: 'flex', 
          justifyContent: 'center',  // 수평 가운데 정렬
          alignItems: 'center',      // 수직 가운데 정렬
          overflowX: 'auto',         // 좌우 스크롤 가능하게 설정
          overflowY: 'auto',         // 필요시 상하 스크롤도 가능하게 설정
        }}>
          <Box sx={{ minWidth: '100%' }}> {/* 테이블 크기 설정으로 스크롤 유도 */}
            <DataGridDemo />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Labelling;
