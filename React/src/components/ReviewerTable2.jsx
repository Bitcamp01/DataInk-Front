import React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';

// LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY'); 재환님 도와줘요

// 새로운 rows 객체
const rows = {
  0: {
    hierarchy: '사건명',
    jobTitle: '코딩은 너무 어려워 사건',
  },
  2: {
    hierarchy: '이유',
    hierarchy2: '1',
    jobTitle: '추상적인 사고 요구: 코딩은 문제를 해결하기 위한 논리적인 사고와 추상화가 필요합니다. 복잡한 개념을 간단한 코드로 표현해야 하고, 컴퓨터가 이해할 수 있는 방식으로 사고를 전환해야 합니다.',
  },
  3: {
    hierarchy: '이유',
    hierarchy2: '2',
    jobTitle: '끊임없는 변화: 기술은 빠르게 발전하고 새로운 언어, 프레임워크, 라이브러리가 지속적으로 등장합니다. 개발자는 이런 변화를 계속 따라가야 하며, 학습이 끊임없이 필요합니다.',
  },
  4: {
    hierarchy: '이유',
    hierarchy2: '3',
    jobTitle: '디버깅과 문제 해결: 코드 작성 자체보다 디버깅 과정이 더 많은 시간을 차지할 수 있습니다. 예기치 않은 버그나 오류를 찾아내고 해결하는 것이 매우 어렵고, 특히 원인을 찾기 힘든 경우가 많습니다.',
  },
  5: {
    hierarchy: '이유',
    hierarchy2: '4',
    jobTitle: '복잡한 시스템 통합: 대규모 애플리케이션에서는 다양한 기술과 시스템을 통합해야 합니다. 서로 다른 기술이 상호작용하는 방식이나 의존성을 이해하고 관리하는 것이 도전적입니다.',
  },
  6: {
    hierarchy: '이유',
    hierarchy2: '5',
    jobTitle: '세밀함과 정확성 요구: 코드는 작은 실수로도 큰 문제를 일으킬 수 있습니다. 변수 이름 하나나 괄호의 위치 같은 사소한 실수가 코드 전체의 동작을 망칠 수 있어서 매우 주의 깊게 작업해야 합니다.',
  },
  7: {
    hierarchy: '이유',
    hierarchy2: '6',
    jobTitle: '그냥',
  },
  9: {
    hierarchy: '언어지원',
    hierarchy2: '영어',
    jobTitle: '',
  },
  10: {
    hierarchy: '언어지원',
    hierarchy2: '영어',
    hierarchy3: '고대영어',
    jobTitle: '지원가능',
  },
  11: {
    hierarchy: '언어지원',
    hierarchy2: '한국어',
    jobTitle: '지원가능',
  },
  13: {
    hierarchy: '언어지원',
    hierarchy2: '중국어',
    hierarchy3: '간체자',
    jobTitle: '지원가능',
  },
  14: {
    hierarchy: '언어지원',
    hierarchy2: '중국어',
    hierarchy3: '번체자',
    jobTitle: '지원불가',
  },
};

// rows 객체를 배열로 변환하여 DataGridPro에 전달
const rowsArray = Object.entries(rows)
  .map(([id, row]) => ({
    id: Number(id),
    content: row.jobTitle,
    hierarchy: row.hierarchy,
    hierarchy2: row.hierarchy2,
    hierarchy3: row.hierarchy3,
  }))
  .filter(row => row.content !== '');  // jobTitle이 빈 문자열이 아닌 것만 필터링

const columns = [
  { 
    field: 'content', 
    headerName: '내용', 
    width: 300,  // 열 너비 조정
    renderCell: (params) => (
      <div style={{ 
        whiteSpace: 'normal',  // 줄 바꿈 가능
        wordWrap: 'break-word', // 긴 단어도 줄 바꿈
        display: 'flex',  // 플렉스박스를 사용하여 정렬
        flexDirection: 'column', 
        alignItems: 'flex-start'
      }}>
        <div style={{ color: 'black' }}>{params.value}</div> {/* 검정 텍스트 */}
        <div style={{
          padding: '5px', // 패딩 추가
          borderRadius: '4px', // 모서리 둥글게
          marginTop: '5px', // 위쪽 여백 추가
        }}>
          {params.row.hierarchy} 
          {params.row.hierarchy2 ? ` > ${params.row.hierarchy2}` : ''} 
          {params.row.hierarchy3 ? ` > ${params.row.hierarchy3}` : ''} {/* hierarchy 요소를 표시 */}
        </div>
      </div>
    ), 
  },
];

const getTreeDataPath = (row) => {
  const path = [row.hierarchy];
  if (row.hierarchy2) path.push(row.hierarchy2);
  if (row.hierarchy3) path.push(row.hierarchy3);
  return path;
};

const ReviewerTable2 = () => {
  return (
    <div className="review-table-container">
      <div style={{ height: 400, width: '100%' }}>
        <DataGridPro
          treeData
          rows={rowsArray}  // 배열로 변환된 데이터 사용
          columns={columns}
          getTreeDataPath={getTreeDataPath}
        />
      </div>
    </div>
  );
};

export default ReviewerTable2;






// import React, { useEffect, useState } from 'react';
// import { DataGridPro } from '@mui/x-data-grid-pro';

// LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY'); 재환님 도와줘요

// // **실제 API 호출 함수**
// const fetchData = async () => {
//   // **실제 API URL로 교체해야 함**
//   const response = await fetch('https://your-api-endpoint.com/data'); 
//   if (!response.ok) {
//     throw new Error('네트워크 응답이 실패했습니다.'); // **오류 처리 추가**
//   }
//   return await response.json(); // **JSON 형태로 데이터 반환**
// };

// const ReviewerTable2 = () => {
//   const [rowsArray, setRowsArray] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await fetchData(); // **fetchData 호출**

//         // rows 객체를 배열로 변환하여 DataGridPro에 전달
//         const transformedData = Object.entries(data)
//           .map(([id, row]) => ({
//             id: Number(id),
//             content: row.jobTitle,
//             hierarchy: row.hierarchy,
//             hierarchy2: row.hierarchy2,
//             hierarchy3: row.hierarchy3,
//           }))
//           .filter(row => row.content !== '');  // jobTitle이 빈 문자열이 아닌 것만 필터링

//         setRowsArray(transformedData);
//       } catch (error) {
//         // **오류 발생 시 콘솔에 오류 출력**
//         console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
//       }
//     };

//     loadData();
//   }, []);

//   const columns = [
//     { 
//       field: 'content', 
//       headerName: '내용', 
//       width: 300,  // 열 너비 조정
//       renderCell: (params) => (
//         <div style={{ 
//           whiteSpace: 'normal',  // 줄 바꿈 가능
//           wordWrap: 'break-word', // 긴 단어도 줄 바꿈
//           display: 'flex',  // 플렉스박스를 사용하여 정렬
//           flexDirection: 'column', 
//           alignItems: 'flex-start'
//         }}>
//           <div style={{ color: 'black' }}>{params.value}</div> {/* 검정 텍스트 */}
//           <div style={{
//             padding: '5px', // 패딩 추가
//             borderRadius: '4px', // 모서리 둥글게
//             marginTop: '5px', // 위쪽 여백 추가
//           }}>
//             {params.row.hierarchy} 
//             {params.row.hierarchy2 ? ` > ${params.row.hierarchy2}` : ''} 
//             {params.row.hierarchy3 ? ` > ${params.row.hierarchy3}` : ''} {/* hierarchy 요소를 표시 */}
//           </div>
//         </div>
//       ), 
//     },
//   ];

//   const getTreeDataPath = (row) => {
//     const path = [row.hierarchy];
//     if (row.hierarchy2) path.push(row.hierarchy2);
//     if (row.hierarchy3) path.push(row.hierarchy3);
//     return path;
//   };

//   return (
//     <div className="review-table-container">
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGridPro
//           treeData
//           rows={rowsArray}  // 배열로 변환된 데이터 사용
//           columns={columns}
//           getTreeDataPath={getTreeDataPath}
//         />
//       </div>
//     </div>
//   );
// };

// export default ReviewerTable2;

