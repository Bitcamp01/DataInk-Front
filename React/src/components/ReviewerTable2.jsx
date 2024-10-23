// import React, { useState } from 'react';
// import { DataGridPro } from '@mui/x-data-grid-pro';

// // 새로운 rows 객체
// const rows = {
//   0: {
//     hierarchy: '사건명',
//     content: '코딩은 너무 어려워 사건', 
//     checked: false, // checked 필드 추가
//   },
//   2: {
//     hierarchy: '이유',
//     hierarchy2: '1',
//     content: '추상적인 사고 요구: 코딩은 문제를 해결하기 위한 논리적인 사고와 추상화가 필요합니다.',
//     checked: false, // checked 필드 추가
//   },
//   3: {
//     hierarchy: '이유',
//     hierarchy2: '2',
//     content: '끊임없는 변화: 기술은 빠르게 발전하고 새로운 언어, 프레임워크, 라이브러리가 지속적으로 등장합니다.',
//     checked: false, // checked 필드 추가
//   },
//   4: {
//     hierarchy: '이유',
//     hierarchy2: '3',
//     content: '디버깅과 문제 해결: 코드 작성 자체보다 디버깅 과정이 더 많은 시간을 차지할 수 있습니다.',
//     checked: false, // checked 필드 추가
//   },
//   5: {
//     hierarchy: '이유',
//     hierarchy2: '4',
//     content: '복잡한 시스템 통합: 대규모 애플리케이션에서는 다양한 기술과 시스템을 통합해야 합니다.',
//     checked: false, // checked 필드 추가
//   },
//   6: {
//     hierarchy: '이유',
//     hierarchy2: '5',
//     content: '세밀함과 정확성 요구: 코드는 작은 실수로도 큰 문제를 일으킬 수 있습니다.',
//     checked: false, // checked 필드 추가
//   },
//   7: {
//     hierarchy: '이유',
//     hierarchy2: '6',
//     content: '그냥', 
//     checked: false, // checked 필드 추가
//   },
//   9: {
//     hierarchy: '언어지원',
//     hierarchy2: '영어',
//     content: '', 
//     checked: false, // checked 필드 추가
//   },
//   10: {
//     hierarchy: '언어지원',
//     hierarchy2: '영어',
//     hierarchy3: '고대영어',
//     content: '지원가능', 
//     checked: false, // checked 필드 추가
//   },
//   11: {
//     hierarchy: '언어지원',
//     hierarchy2: '한국어',
//     content: '지원가능', 
//     checked: false, // checked 필드 추가
//   },
//   13: {
//     hierarchy: '언어지원',
//     hierarchy2: '중국어',
//     hierarchy3: '간체자',
//     content: '지원가능', 
//     checked: false, // checked 필드 추가
//   },
//   14: {
//     hierarchy: '언어지원',
//     hierarchy2: '중국어',
//     hierarchy3: '번체자',
//     content: '지원불가', 
//     checked: false, // checked 필드 추가
//   },
// };

// // rows 객체를 배열로 변환하여 DataGridPro에 전달
// const rowsArray = Object.entries(rows)
//   .map(([id, row]) => ({
//     id: Number(id),
//     content: row.content, 
//     hierarchy: row.hierarchy,
//     hierarchy2: row.hierarchy2,
//     hierarchy3: row.hierarchy3,
//     checked: row.checked, // checked 필드 추가
//   }))
//   .filter(row => row.content !== '');  // content가 빈 문자열이 아닌 것만 필터링

// const columns = [
//   { 
//     field: 'content', 
//     headerName: '내용', 
//     width: 300,  
//     renderCell: (params) => (
//       <div style={{ 
//         whiteSpace: 'normal', 
//         wordWrap: 'break-word', 
//         display: 'flex',  
//         flexDirection: 'column', 
//         alignItems: 'flex-start'
//       }}>
//         <div style={{ color: 'black' }}>{params.value}</div> 
//         <div style={{
//           padding: '5px', 
//           borderRadius: '4px', 
//           marginTop: '5px', 
//         }}>
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

// const ReviewerTable2 = () => {
//   const [selectedRows, setSelectedRows] = useState([]);  // 선택된 행의 ID 저장
//   const [rowsData, setRowsData] = useState(rowsArray); // rows 상태 관리

//   const handleSelectionModelChange = (newSelection) => {
//     setSelectedRows(newSelection);  // 선택된 ID 배열을 업데이트

//     // 선택된 행의 checked 상태 업데이트
//     const updatedRows = rowsData.map(row => ({
//       ...row,
//       checked: newSelection.includes(row.id), // 체크 상태 업데이트
//     }));
//     setRowsData(updatedRows);
//   };

//   // 마우스 이벤트 핸들러 정의
//   const handleMouseEnter = (rowId) => {
//     console.log(`Mouse entered on row: ${rowId}`);
//   };

//   const handleMouseLeave = (rowId) => {
//     console.log(`Mouse left row: ${rowId}`);
//   };

//   return (
//     <div className="review-table-container">
//       <div style={{ height: '100%', width: '100%' }}>
//         <DataGridPro
//           treeData
//           rows={rowsData}  
//           columns={columns}
//           getTreeDataPath={getTreeDataPath}
//           checkboxSelection  // 체크박스 활성화
//           onSelectionModelChange={handleSelectionModelChange}  // 선택 모델 변경 핸들러
//           selectionModel={selectedRows}  // 선택된 행의 ID 관리
//           onRowMouseEnter={(params) => handleMouseEnter(params.id)} // 마우스 엔터 이벤트
//           onRowMouseLeave={(params) => handleMouseLeave(params.id)} // 마우스 리브 이벤트
//         />
//       </div>
//     </div>
//   );
// };

// export default ReviewerTable2;









import React, { useEffect, useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';

const fetchData = async () => {
  const response = await fetch('https://223.130.134.24/labeltask/data');
  if (!response.ok) {
    throw new Error('네트워크 응답이 실패했습니다.');
  }
  return await response.json();
};

const ReviewerTable2 = () => {
  const [rowsArray, setRowsArray] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();

        // hierarchy 필드를 배열 형태로 변환
        const transformedData = Object.entries(data)
          .map(([id, row]) => {
            const hierarchyArray = [];
            Object.keys(row).forEach(key => {
              if (key.startsWith('hierarchy')) {
                hierarchyArray.push(row[key]);
              }
            });
            return {
              id: Number(id),
              content: row.content,
              hierarchyArray,
              checked: row.checked || false,
            };
          })
          .filter(row => row.content !== '');

        setRowsArray(transformedData);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    loadData();
  }, []);

  const columns = [
    {
      field: 'content',
      headerName: '내용',
      width: 300,
      renderCell: (params) => (
        <div style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{ color: 'black' }}>{params.value}</div>
          <div style={{
            padding: '5px',
            borderRadius: '4px',
            marginTop: '5px',
          }}>
            {params.row.hierarchyArray.join(' > ')} {/* hierarchyArray를 사용하여 표시 */}
          </div>
        </div>
      ),
    },
    {
      field: 'checked',
      headerName: '선택',
      width: 100,
      type: 'boolean',
      editable: true,
    },
  ];

  const getTreeDataPath = (row) => {
    return row.hierarchyArray.filter(Boolean); // 빈 값이 아닌 것만 사용
  };

  return (
    <div className="review-table-container">
      <div style={{ height: 400, width: '100%' }}>
        <DataGridPro
          treeData
          rows={rowsArray}
          columns={columns}
          getTreeDataPath={getTreeDataPath}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default ReviewerTable2;

