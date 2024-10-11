// import React, { useState } from 'react';
// import { DataGridPro } from '@mui/x-data-grid-pro';
// import '../css/reviewer.css';

// // 새로운 rows 객체
// const rows = {
//   0: { hierarchy: '사건명', content: '코딩은 너무 어려워 사건' },
//   2: { hierarchy: '이유', hierarchy2: '1', content: '추상적인 사고 요구: 코딩은 문제 해결을 위한 논리적 사고와 추상화가 필요합니다.' },
//   3: { hierarchy: '이유', hierarchy2: '2', content: '끊임없는 변화: 새로운 언어, 프레임워크가 지속적으로 등장합니다.' },
//   4: { hierarchy: '이유', hierarchy2: '3', content: '디버깅: 코드를 수정하는데 많은 시간이 소요될 수 있습니다.' },
//   5: { hierarchy: '이유', hierarchy2: '4', content: '복잡한 시스템 통합: 다양한 기술과 시스템을 통합해야 합니다.' },
//   6: { hierarchy: '이유', hierarchy2: '5', content: '세밀함과 정확성: 작은 실수로 큰 문제가 발생할 수 있습니다.' },
//   7: { hierarchy: '이유', hierarchy2: '6', content: '그냥' },
//   10: { hierarchy: '언어지원', hierarchy2: '영어', hierarchy3: '고대영어', content: '지원가능' },
//   11: { hierarchy: '언어지원', hierarchy2: '한국어', content: '지원가능' },
//   13: { hierarchy: '언어지원', hierarchy2: '중국어', hierarchy3: '간체자', content: '지원가능' },
//   14: { hierarchy: '언어지원', hierarchy2: '중국어', hierarchy3: '번체자', content: '지원불가' },
// };

// // rows 객체를 배열로 변환하여 DataGridPro에 전달
// const rowsArray = Object.entries(rows)
//   .map(([id, row]) => ({
//     id: Number(id),
//     content: row.content,
//     hierarchy: row.hierarchy,
//     hierarchy2: row.hierarchy2,
//     hierarchy3: row.hierarchy3,
//   }))
//   .filter(row => row.content !== '');  // content가 빈 문자열이 아닌 것만 필터링

// const columns = [
//   { 
//     field: 'content', 
//     headerName: '내용', 
//     width: 300,  
//     renderCell: (params) => (
//       <div className="cell-content" style={{ whiteSpace: 'normal', wordWrap: 'break-word', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//         <div style={{ color: 'black' }}>{params.value}</div>
//         <div className="hierarchy-info" style={{ padding: '5px', borderRadius: '4px', marginTop: '5px' }}>
//           {params.row.hierarchy}
//           {params.row.hierarchy2 ? ` > ${params.row.hierarchy2}` : ''}
//           {params.row.hierarchy3 ? ` > ${params.row.hierarchy3}` : ''}
//         </div>
//       </div>
//     ),
//   },
// ];

// const getTreeDataPath = (row) => {
//   const path = [row.hierarchy];
//   if (row.hierarchy2) path.push(row.hierarchy2);
//   if (row.hierarchy3) path.push(row.hierarchy3);
//   return path;
// };

// const LabelingTable = () => {
//   const [selectedRows, setSelectedRows] = useState([]);  // 선택된 행의 ID 저장
//   const [hoveredRow, setHoveredRow] = useState(null);  // 마우스오버한 행 저장

//   const handleSelectionModelChange = (newSelection) => {
//     setSelectedRows(newSelection);  // 선택된 ID 배열을 업데이트
//   };

//   const handleMouseEnter = (rowId) => {
//     setHoveredRow(rowId);  // 마우스오버한 행 저장
//   };

//   const handleMouseLeave = () => {
//     setHoveredRow(null);  // 마우스가 떠났을 때 초기화
//   };

//   return (
//     <div className="label-table-container">
//       <div style={{ height: '100%', width: '100%' }}>
//         <DataGridPro
//           treeData
//           rows={rowsArray}  
//           columns={columns}
//           getTreeDataPath={getTreeDataPath}
//           checkboxSelection  // 체크박스 활성화
//           onSelectionModelChange={handleSelectionModelChange}  // 선택 모델 변경 핸들러
//           selectionModel={selectedRows}  // 선택된 행의 ID 관리
//           defaultGroupingExpansionDepth={-1}  // 모든 행을 펼친 상태로 시작
//           onCellMouseEnter={(params) => handleMouseEnter(params.id)}  // 마우스오버 핸들러
//           onCellMouseLeave={handleMouseLeave}  // 마우스가 떠났을 때
//         />
//       </div>

//       {/* 마우스오버한 셀에 설명창을 표시 */}
//       {hoveredRow !== null && (
//         <div className="tooltip">
//           <p>설명창 자리입니다</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabelingTable;


import React, { useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import '../css/reviewer.css';

// 새로운 rows 객체
const rows = {
  0: { hierarchy: '사건명', content: '코딩은 너무 어려워 사건' },
  2: { hierarchy: '이유', hierarchy2: '1', content: '추상적인 사고 요구: 코딩 문제 해결을 위한 논리적 사고와 추상화가 필요합니다.' },
  3: { hierarchy: '이유', hierarchy2: '2', content: '끊임없는 변화: 새로운 언어와 프레임워크가 지속적으로 등장합니다.' },
  4: { hierarchy: '이유', hierarchy2: '3', content: '디버깅: 코드를 수정하는데 많은 시간이 소요될 수 있습니다.' },
  5: { hierarchy: '이유', hierarchy2: '4', content: '복잡한 시스템 통합: 다양한 기술과 시스템을 통합해야 합니다.' },
  6: { hierarchy: '이유', hierarchy2: '5', content: '세밀함과 정확성: 작은 실수로도 큰 문제가 발생할 수 있습니다.' },
  7: { hierarchy: '이유', hierarchy2: '6', content: '그냥' },
  10: { hierarchy: '언어지원', hierarchy2: '영어', hierarchy3: '고대영어', content: '지원가능' },
  11: { hierarchy: '언어지원', hierarchy2: '한국어', content: '지원가능' },
  13: { hierarchy: '언어지원', hierarchy2: '중국어', hierarchy3: '간체자', content: '지원가능' },
  14: { hierarchy: '언어지원', hierarchy2: '중국어', hierarchy3: '번체자', content: '지원불가' },
};

// rows 객체를 배열로 변환하여 DataGridPro에 전달
const rowsArray = Object.entries(rows)
  .map(([id, row]) => ({
    id: Number(id),
    content: row.content,
    hierarchy: row.hierarchy,
    hierarchy2: row.hierarchy2,
    hierarchy3: row.hierarchy3,
  }))
  .filter(row => row.content !== '');  // content가 빈 문자열이 아닌 것만 필터링



const getTreeDataPath = (row) => {
  const path = [row.hierarchy];
  if (row.hierarchy2) path.push(row.hierarchy2);
  if (row.hierarchy3) path.push(row.hierarchy3);
  return path;
};

const LabelingTable = () => {
  const [hoveredRow, setHoveredRow] = useState(null);  // 마우스오버한 행 저장
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });  // 설명창의 위치 저장

  // 마우스가 셀에 올라갔을 때 실행되는 함수
  const handleMouseEnter = (event, rowId) => {
    setHoveredRow(rowId);  // 마우스오버한 행 저장
    setTooltipPos({ x: event.clientX, y: event.clientY });  // 마우스 위치 저장
  };

  // 마우스가 셀에서 나갔을 때 실행되는 함수
  const handleMouseLeave = () => {
    setHoveredRow(null);  // 마우스가 떠났을 때 초기화
  };

  const columns = [
    { 
      field: 'content', 
      headerName: '내용', 
      width: 300,  
      renderCell: (params) => (
        <div 
          style={{ 
            whiteSpace: 'normal', 
            wordWrap: 'break-word', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            position: 'relative' // 설명창의 위치를 상대적으로 설정
          }}
          onMouseEnter={(event) => handleMouseEnter(event, params.id)}  // 마우스 진입 시 이벤트 처리
          onMouseLeave={handleMouseLeave}  // 마우스 나갈 때
        >
          <div style={{ color: 'black' }}>{params.value}</div>
          <div style={{ padding: '5px', borderRadius: '4px', marginTop: '5px' }}>
            {params.row.hierarchy}
            {params.row.hierarchy2 ? ` > ${params.row.hierarchy2}` : ''}
            {params.row.hierarchy3 ? ` > ${params.row.hierarchy3}` : ''}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="label-table-container">
      <div style={{ height: '100%', width: '100%' }}>
        <DataGridPro
          treeData
          rows={rowsArray}  
          columns={columns}
          getTreeDataPath={getTreeDataPath}
          checkboxSelection  // 체크박스 활성화
          defaultGroupingExpansionDepth={-1}  // 모든 행을 펼친 상태로 시작
        />
      </div>

      {/* 마우스오버한 셀에 설명창을 표시 */}
      {hoveredRow !== null && (
        <div 
          className="tooltip" 
          style={{ 
            position: 'absolute', 
            top: `${tooltipPos.y}px`, 
            left: `${tooltipPos.x}px`, 
            backgroundColor: 'white', 
            border: '1px solid black', 
            padding: '5px', 
            zIndex: 1000 
          }}
        >
          <p>설명창 자리입니다</p>
        </div>
      )}
    </div>
  );
};

export default LabelingTable;
