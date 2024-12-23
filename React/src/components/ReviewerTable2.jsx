import React, { useEffect, useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLabelTaskDetails } from '../apis/labelTaskApis';

const ReviewerTable2 = ({ taskId, onDataTransform }) => {
  const dispatch = useDispatch();
  const [rowsArray, setRowsArray] = useState([]);

  // const { labelTaskData, loading, error } = useSelector((state) => state.labelTaskSlice);
  // const { labelTaskData, loading, error } = useSelector((state) => state.labelTaskSlice || {}); // 이게 일단은 정배
  const { labelTaskData = null, loading, error } = useSelector((state) => state.labelTaskSlice || {});


  useEffect(() => {
    if (taskId) {
      dispatch(fetchLabelTaskDetails(taskId));
    }
  }, [taskId, dispatch]);

  const transformData = (data, hierarchy = [], index = 0) => {
    const transformed = {};
    
    data.forEach((item, idx) => {
      const currentHierarchy = [...hierarchy, item.fieldName];
      const row = { id: index + idx }; // 각 행에 고유한 ID 추가
    
      currentHierarchy.forEach((level, levelIdx) => {
        row[levelIdx === 0 ? "hierarchy" : `hierarchy${levelIdx + 1}`] = level;
      });
    
      const contentValue = item.subFields ? item.subFields.content : "undefined";
    
      if (typeof item.subFields === 'string') {
        transformed[index++] = {
          ...row,
          content: contentValue,
          checked: false,
        };
      } else if (Array.isArray(item.subFields)) {
        const subFieldsTransformed = transformData(item.subFields, currentHierarchy, index);
        Object.keys(subFieldsTransformed).forEach((key) => {
          transformed[index++] = { ...subFieldsTransformed[key], id: index++ };
        });
      } else if (typeof item.subFields === 'object') {
        transformed[index++] = {
          ...row,
          content: contentValue,
          checked: false,
        };
      }
    });

    onDataTransform(transformed);
    
    return Object.values(transformed); // 객체 대신 배열로 반환
  };
  useEffect(() => {
    // labelTaskData가 존재할 때만 변환 수행
    if (labelTaskData) { // 변경된 부분
      const transformedData = transformData(labelTaskData);
      setRowsArray(transformedData);
      // if (onDataTransform) {
      //   onDataTransform(transformedData);
      // }
    }
  }, [labelTaskData]);


  const columns = [
    {
      field: 'content',
      headerName: '내용',
      width: 300,
      renderCell: (params) => {
        // 숫자 부분을 제거하고 싶다면 여기에 맞는 내용으로 변경
        return <div>{params.row.subFields ? '' : ''}</div>; // 빈 문자열 반환
      },
    },
    {
      field: 'checked',
      headerName: '선택',
      width: 100,
      type: 'boolean',
      editable: true,
    },
  ];

  const handleRowEdit = (updatedRow) => {
    const updatedRows = rowsArray.map((row) => {
      if (row.id === updatedRow.id) {
        return { ...row, checked: !row.checked }; // 체크박스 상태 변경
      }
      return row;
    });
    setRowsArray(updatedRows);
  };

  return (
    rowsArray && <div className="review-table-container">
      <div style={{ height: 400, width: '100%' }}>
        <DataGridPro
          treeData
          rows={rowsArray}
          columns={columns}
          // checkboxSelection
          getTreeDataPath={(row) => {
            // hierarchy 계층의 모든 레벨을 추출하여 배열로 반환
            const path = Object.keys(row)
              .filter((key) => key.startsWith("hierarchy"))
              .sort((a, b) => a.localeCompare(b)) // 순서 정렬
              .map((key) => row[key]);

            return path.length > 0 ? path : ["root"]; // path가 비어있으면 기본값 "root" 설정
          }}
          onRowEdit={handleRowEdit}
        />
      </div>
    </div>
  );
};

export default ReviewerTable2;












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







