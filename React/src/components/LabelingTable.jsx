// import React, { useState, useEffect } from 'react';
// import { DataGridPro } from '@mui/x-data-grid-pro';
// import '../css/reviewer.css';

// const LabelingTable = () => {
//   const [rowsData, setRowsData] = useState([]);
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
//   const [editRowsModel, setEditRowsModel] = useState({});

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://example.com/api/rows');
//       const data = await response.json();
//       const formattedData = Object.entries(data).map(([id, row]) => {
//         // hierarchy 관련 필드를 배열로 수집
//         const hierarchyArray = [];
//         Object.keys(row).forEach(key => {
//           if (key.startsWith('hierarchy')) {
//             hierarchyArray.push(row[key]);
//           }
//         });
//         return {
//           id: Number(id),
//           content: row.content,
//           hierarchyArray, // 수집한 hierarchy 배열
//           checked: row.checked,
//         };
//       });
//       setRowsData(formattedData);
//     } catch (error) {
//       console.error('데이터를 가져오는 데 실패했습니다:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleMouseEnter = (event, rowId) => {
//     setHoveredRow(rowId);
//     setTooltipPos({ x: event.clientX, y: event.clientY });
//   };

//   const handleMouseLeave = () => {
//     setHoveredRow(null);
//   };

//   const handleEditRowsModelChange = (model) => {
//     setEditRowsModel(model);
//   };

//   const handleProcessRowUpdate = (newRow) => {
//     const updatedRows = rowsData.map(row => (row.id === newRow.id ? newRow : row));
//     setRowsData(updatedRows);
//     return newRow;
//   };

//   const columns = [
//     { 
//       field: 'content', 
//       headerName: '내용', 
//       width: 300,
//       editable: true,
//       renderCell: (params) => (
//         <div 
//           style={{ 
//             whiteSpace: 'normal', 
//             wordWrap: 'break-word', 
//             display: 'flex', 
//             flexDirection: 'column', 
//             alignItems: 'flex-start', 
//             position: 'relative'
//           }}
//           onMouseEnter={(event) => handleMouseEnter(event, params.id)}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div style={{ color: 'black' }}>{params.value}</div>
//           <div style={{ padding: '5px', borderRadius: '4px', marginTop: '5px' }}>
//             {params.row.hierarchyArray.join(' > ')} {/* hierarchyArray를 사용하여 계층 구조 표시 */}
//           </div>
//         </div>
//       ),
//     },
//     {
//       field: 'checked',
//       headerName: '체크 상태',
//       width: 150,
//       renderCell: (params) => (
//         <input 
//           type="checkbox" 
//           checked={params.value} 
//           readOnly
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="label-table-container">
//       <div style={{ height: '100%', width: '100%' }}>
//         <DataGridPro
//           treeData
//           rows={rowsData}
//           columns={columns}
//           getTreeDataPath={(row) => row.hierarchyArray.filter(Boolean)} // 빈 값 제외
//           defaultGroupingExpansionDepth={-1}
//           editRowsModel={editRowsModel}
//           onEditRowsModelChange={handleEditRowsModelChange}
//           processRowUpdate={handleProcessRowUpdate}
//         />
//       </div>

//       {hoveredRow !== null && (
//         <div 
//           className="tooltip" 
//           style={{ 
//             position: 'absolute', 
//             top: `${tooltipPos.y}px`, 
//             left: `${tooltipPos.x}px`, 
//             backgroundColor: 'white', 
//             border: '1px solid black', 
//             padding: '5px', 
//             zIndex: 1000 
//           }}
//         >
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
  0: { hierarchy: '사건명', content: '코딩은 너무 어려워 사건', checked: false },
  2: { hierarchy: '이유', hierarchy2: '1', content: '추상적인 사고 요구: 코딩 문제 해결을 위한 논리적 사고와 추상화가 필요합니다.', checked: false },
  3: { hierarchy: '이유', hierarchy2: '2', content: '끊임없는 변화: 새로운 언어와 프레임워크가 지속적으로 등장합니다.', checked: false },
  4: { hierarchy: '이유', hierarchy2: '3', content: '디버깅: 코드를 수정하는데 많은 시간이 소요될 수 있습니다.', checked: false },
  5: { hierarchy: '이유', hierarchy2: '4', content: '복잡한 시스템 통합: 다양한 기술과 시스템을 통합해야 합니다.', checked: false },
  6: { hierarchy: '이유', hierarchy2: '5', content: '세밀함과 정확성: 작은 실수로도 큰 문제가 발생할 수 있습니다.', checked: false },
  7: { hierarchy: '이유', hierarchy2: '6', content: '그냥', checked: false },
  10: { hierarchy: '언어지원', hierarchy2: '영어', hierarchy3: '고대영어', content: '지원가능', checked: false },
  11: { hierarchy: '언어지원', hierarchy2: '한국어', content: '지원가능', checked: false },
  13: { hierarchy: '언어지원', hierarchy2: '중국어', hierarchy3: '간체자', content: '지원가능', checked: false },
  14: { hierarchy: '언어지원', hierarchy2: '중국어', hierarchy3: '번체자', content: '지원불가', checked: false },
};

// rows 객체를 배열로 변환하여 DataGridPro에 전달
const rowsArray = Object.entries(rows)
  .map(([id, row]) => ({
    id: Number(id),
    content: row.content,
    hierarchy: row.hierarchy,
    hierarchy2: row.hierarchy2,
    hierarchy3: row.hierarchy3,
    checked: row.checked,
  }))
  .filter(row => row.content !== '');

const getTreeDataPath = (row) => {
  const path = [row.hierarchy];
  if (row.hierarchy2) path.push(row.hierarchy2);
  if (row.hierarchy3) path.push(row.hierarchy3);
  return path;
};

const LabelingTable = () => {
  const [rowsData, setRowsData] = useState(rowsArray);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [editRowsModel, setEditRowsModel] = useState({});

  const handleMouseEnter = (event, rowId) => {
    setHoveredRow(rowId);
    setTooltipPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleEditRowsModelChange = (model) => {
    setEditRowsModel(model);
  };

  const handleProcessRowUpdate = (newRow) => {
    const updatedRows = rowsData.map(row => (row.id === newRow.id ? newRow : row));
    setRowsData(updatedRows);
    return newRow;
  };

  const handleProcessRowUpdateError = (error) => {
    console.error('Row update failed:', error);
  };

  const columns = [
    { 
      field: 'content', 
      headerName: '내용', 
      width: 300,
      editable: true,  // 셀 편집 활성화
      renderCell: (params) => (
        <div 
          style={{ 
            whiteSpace: 'normal', 
            wordWrap: 'break-word', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            position: 'relative'
          }}
          onMouseEnter={(event) => handleMouseEnter(event, params.id)}
          onMouseLeave={handleMouseLeave}
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
    {
      field: 'checked',
      headerName: '체크 상태',
      width: 150,
      editable: false,  // 읽기 전용 설정
      renderCell: (params) => (
        <input 
          type="checkbox" 
          checked={params.value} 
          readOnly 
        />
      ),
    },
  ];

  return (
    <div className="label-table-container">
      <div style={{ height: '100%', width: '100%' }}>
        <DataGridPro
          treeData
          rows={rowsData}
          columns={columns}
          getTreeDataPath={getTreeDataPath}
          defaultGroupingExpansionDepth={-1}
          editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>

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



