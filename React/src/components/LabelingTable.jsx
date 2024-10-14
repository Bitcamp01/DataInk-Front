// import React, { useState, useEffect } from 'react';
// import { DataGridPro } from '@mui/x-data-grid-pro';
// import '../css/reviewer.css';

// const LabelingTable = () => {
//   // 상태 변수 설정
//   const [rowsData, setRowsData] = useState([]); // 테이블에 표시할 행 데이터 상태
//   const [hoveredRow, setHoveredRow] = useState(null); // 마우스를 올린 행의 ID
//   const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 }); // 툴팁의 위치
//   const [editRowsModel, setEditRowsModel] = useState({}); // 테이블의 편집 모델 상태

//   // 데이터를 비동기적으로 가져오는 함수
//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://example.com/api/rows'); // API에서 데이터를 가져옴 (URL을 실제 엔드포인트로 변경)
//       const data = await response.json(); // JSON 형식으로 응답을 파싱
//       const formattedData = Object.entries(data).map(([id, row]) => ({
//         id: Number(id), // id를 숫자로 변환
//         content: row.content, // content 필드
//         hierarchy: row.hierarchy, // hierarchy 필드
//         hierarchy2: row.hierarchy2, // hierarchy2 필드 (존재하는 경우)
//         hierarchy3: row.hierarchy3, // hierarchy3 필드 (존재하는 경우)
//         checked: row.checked, // checked 상태
//       }));
//       setRowsData(formattedData); // 가져온 데이터를 상태에 저장
//     } catch (error) {
//       console.error('데이터를 가져오는 데 실패했습니다:', error); // 에러가 발생하면 콘솔에 출력
//     }
//   };

//   // 컴포넌트가 마운트될 때 데이터를 가져오기 위한 useEffect
//   useEffect(() => {
//     fetchData(); // fetchData 함수를 호출하여 데이터를 가져옴
//   }, []); // 빈 배열을 사용하여 컴포넌트가 처음 렌더링될 때만 실행

//   // 마우스가 특정 셀 위에 있을 때 툴팁을 표시하기 위한 함수
//   const handleMouseEnter = (event, rowId) => {
//     setHoveredRow(rowId); // 마우스가 올라간 행의 ID를 상태로 설정
//     setTooltipPos({ x: event.clientX, y: event.clientY }); // 마우스 위치에 맞춰 툴팁 위치를 설정
//   };

//   // 마우스가 셀을 벗어났을 때 툴팁을 숨기는 함수
//   const handleMouseLeave = () => {
//     setHoveredRow(null); // 툴팁을 표시할 행이 없도록 설정
//   };

//   // 테이블의 편집 모델 변경 시 호출되는 함수
//   const handleEditRowsModelChange = (model) => {
//     setEditRowsModel(model); // 변경된 편집 모델을 상태로 설정
//   };

//   // 행이 업데이트될 때 처리하는 함수
//   const handleProcessRowUpdate = (newRow) => {
//     // 업데이트된 행 데이터를 기존 데이터에서 찾아 교체
//     const updatedRows = rowsData.map(row => (row.id === newRow.id ? newRow : row));
//     setRowsData(updatedRows); // 업데이트된 데이터를 상태로 설정
//     return newRow; // 새로 업데이트된 행을 반환
//   };

//   // 테이블의 열 정의
//   const columns = [
//     { 
//       field: 'content', 
//       headerName: '내용', 
//       width: 300,
//       editable: true,  // 셀 편집 활성화
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
//           onMouseEnter={(event) => handleMouseEnter(event, params.id)} // 마우스를 셀에 올렸을 때 호출
//           onMouseLeave={handleMouseLeave} // 마우스를 셀에서 벗어났을 때 호출
//         >
//           <div style={{ color: 'black' }}>{params.value}</div> {/* content 값 출력 */}
//           <div style={{ padding: '5px', borderRadius: '4px', marginTop: '5px' }}>
//             {params.row.hierarchy} {/* hierarchy 값 출력 */}
//             {params.row.hierarchy2 ? ` > ${params.row.hierarchy2}` : ''} {/* hierarchy2 값이 있을 경우 출력 */}
//             {params.row.hierarchy3 ? ` > ${params.row.hierarchy3}` : ''} {/* hierarchy3 값이 있을 경우 출력 */}
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
//           readOnly // 체크박스를 읽기 전용으로 설정
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="label-table-container">
//       <div style={{ height: '100%', width: '100%' }}>
//         <DataGridPro
//           treeData // 트리 데이터 형식 사용
//           rows={rowsData} // 행 데이터
//           columns={columns} // 열 정의
//           getTreeDataPath={(row) => [row.hierarchy, row.hierarchy2, row.hierarchy3].filter(Boolean)} // 트리 경로 설정
//           defaultGroupingExpansionDepth={-1} // 기본 그룹 확장 깊이 (-1은 모든 그룹을 확장)
//           editRowsModel={editRowsModel} // 편집 모델 설정
//           onEditRowsModelChange={handleEditRowsModelChange} // 편집 모델 변경 시 처리
//           processRowUpdate={handleProcessRowUpdate} // 행 업데이트 처리
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
//           <p>설명창 자리입니다</p> {/* 툴팁 내용 */}
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



