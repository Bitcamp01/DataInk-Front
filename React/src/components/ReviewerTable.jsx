import React, { useState } from 'react';
import '../css/reviewer.css';

const ReviewerTable = () => {
    const [tableData, setTableData] = useState({
        0: { cols: [{ colSpan: 5, text: '사건명' }, { colSpan: 5, text: '' }] },
        1: { cols: [{ colSpan: 5, text: '사건번호' }, { colSpan: 5, text: '' }] },
        2: { cols: [{ colSpan: 5, text: '제출일자' }, { colSpan: 5, text: '' }] },
        3: { cols: [{ colSpan: 2, rowSpan: 4, text: '이유' }, { colSpan: 3, text: '이유1' }, { colSpan: 5, text: '' }] },
        4: { cols: [{ colSpan: 3, text: '이유2' }, { colSpan: 5, text: '' }] },
        5: { cols: [{ colSpan: 3, text: '이유3' }, { colSpan: 5, text: '' }] },
        6: { cols: [{ colSpan: 3, text: '이유4' }, { colSpan: 5, text: '' }] },
        7: { cols: [{ colSpan: 2, rowSpan: 2, text: '사건명' }, { colSpan: 3, text: '한글' }, { colSpan: 5, text: '' }] },
        8: { cols: [{ colSpan: 3, text: '영어' }, { colSpan: 5, text: '' }] },
        9: { cols: [{ colSpan: 2, rowSpan: 7, text: '참조' }, { colSpan: 3, text: '참조1' }, { colSpan: 5, text: '' }] },
        10: { cols: [{ colSpan: 3, text: '참조2' }, { colSpan: 5, text: '' }] },
        11: { cols: [{ colSpan: 3, text: '참조3' }, { colSpan: 5, text: '' }] },
        12: { cols: [{ colSpan: 3, text: '참조4' }, { colSpan: 5, text: '' }] },
        13: { cols: [{ colSpan: 3, text: '참조5' }, { colSpan: 5, text: '' }] },
        14: { cols: [{ colSpan: 3, text: '참조6' }, { colSpan: 5, text: '' }] },
        15: { cols: [{ colSpan: 3, text: '참조7' }, { colSpan: 5, text: '' }] }
    });

    // 클릭한 셀의 상태를 저장할 객체
    const [activeCells, setActiveCells] = useState({});

    // useEffect(() => {
    //     // JSON 파일을 가져와 상태에 저장
    //     fetch('/path/to/data.json') // **외부 JSON 파일 경로**
    //         .then((response) => response.json())
    //         .then((data) => setTableData(data)) // **가져온 데이터를 tableData에 저장**
    //         .catch((error) => console.error('Error fetching table data:', error)); // **오류 처리**
    // }, []);

    const handleCellClick = (rowIndex) => {
        const lastColIndex = tableData[rowIndex].cols.length - 1;
        const key = `${rowIndex}-${lastColIndex}`; // 행 인덱스와 열 인덱스를 합쳐 키 생성

        setActiveCells((prev) => ({
            ...prev,
            [key]: !prev[key] // 클릭 시 상태 토글
        }));
    };

    return (
        <div className="review-table-container">
            <table className="review-table">
            <thead>
                <tr className="review-table-header">
                    <th colSpan="5" className="main-font">분류명</th> {/* 클래스 추가 */}
                    <th colSpan="5" className="main-font">내용</th> {/* 클래스 추가 */}
                </tr>
            </thead>
                <tbody>
                    {Object.entries(tableData).map(([rowIndex, row]) => (
                        <tr key={rowIndex}>
                            {row.cols.map((col, colIndex) => {
                                const isActive = activeCells[`${rowIndex}-${colIndex}`]; // 클릭 상태 확인
                                return (
                                    <td
                                        key={colIndex}
                                        colSpan={col.colSpan}
                                        rowSpan={col.rowSpan || 1}
                                        className={`review-divide ${isActive ? 'active' : ''}`} // active 클래스 추가
                                        onClick={() => handleCellClick(rowIndex)} // 클릭 이벤트 처리
                                    >
                                        {col.text}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewerTable;






// import React, { useState } from 'react';
// import '../css/reviewer.css';

// const ReviewerTable = () => { 
//     const [tableData, setTableData] = useState({
//         0: { cols: [ { colSpan: 5, text: '사건명' }, { colSpan: 5, text: '' } ] },
//         1: { cols: [ { colSpan: 5, text: '사건번호' }, { colSpan: 5, text: '' } ] },
//         2: { cols: [ { colSpan: 5, text: '제출일자' }, { colSpan: 5, text: '' } ] },
//         3: { cols: [ { colSpan: 2, rowSpan: 4, text: '이유' }, { colSpan: 3, text: '이유1' }, { colSpan: 5, text: '' } ] },
//         4: { cols: [ { colSpan: 3, text: '이유2' }, { colSpan: 5, text: '' } ] },
//         5: { cols: [ { colSpan: 3, text: '이유3' }, { colSpan: 5, text: '' } ] },
//         6: { cols: [ { colSpan: 3, text: '이유4' }, { colSpan: 5, text: '' } ] },
//         7: { cols: [ { colSpan: 2, rowSpan: 2, text: '사건명' }, { colSpan: 3, text: '한글' }, { colSpan: 5, text: '' } ] },
//         8: { cols: [ { colSpan: 3, text: '영어' }, { colSpan: 5, text: '' } ] },
//         9: { cols: [ { colSpan: 2, rowSpan: 7, text: '참조' }, { colSpan: 3, text: '참조1' }, { colSpan: 5, text: '' } ] },
//         10: { cols: [ { colSpan: 3, text: '참조2' }, { colSpan: 5, text: '' } ] },
//         11: { cols: [ { colSpan: 3, text: '참조3' }, { colSpan: 5, text: '' } ] },
//         12: { cols: [ { colSpan: 3, text: '참조4' }, { colSpan: 5, text: '' } ] },
//         13: { cols: [ { colSpan: 3, text: '참조5' }, { colSpan: 5, text: '' } ] },
//         14: { cols: [ { colSpan: 3, text: '참조6' }, { colSpan: 5, text: '' } ] },
//         15: { cols: [ { colSpan: 3, text: '참조7' }, { colSpan: 5, text: '' } ] }
//     });

//     // 행 추가
//     const addRow = (rowData) => {
//         setTableData(prev => ({ ...prev, [Object.keys(prev).length]: rowData }));
//     };

//     // 행 삭제
//     const removeRow = (rowId) => {
//         const { [rowId]: _, ...rest } = tableData;  // 객체에서 해당 키를 제거
//         setTableData(rest);
//     };

//     // 셀 병합
//     const mergeCells = (rowId, colIndex, newColSpan) => {
//         const updatedTable = { ...tableData };
//         const updatedCols = [...updatedTable[rowId].cols];
//         updatedCols[colIndex] = { ...updatedCols[colIndex], colSpan: newColSpan };
//         updatedTable[rowId].cols = updatedCols;
//         setTableData(updatedTable);
//     };

//     // 셀 분할
//     const splitCells = (rowId, colIndex, newCols) => {
//         const updatedTable = { ...tableData };
//         const updatedCols = [...updatedTable[rowId].cols];
//         updatedCols.splice(colIndex, 1, ...newCols);  // 분할된 셀 삽입
//         updatedTable[rowId].cols = updatedCols;
//         setTableData(updatedTable);
//     };

//     return (
//         <div className="review-table-container">
//             <table className="review-table">
//                 <thead>
//                     <tr className="review-table-header">
//                         <th colSpan="5">분류명</th>
//                         <th colSpan="5">내용</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Object.values(tableData).map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                             {row.cols.map((col, colIndex) => (
//                                 <td
//                                     key={colIndex}
//                                     colSpan={col.colSpan}
//                                     rowSpan={col.rowSpan || 1}
//                                     className="review-divide"
//                                 >
//                                     {col.text}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ReviewerTable;



// import React, { useState } from 'react';
// import '../css/reviewer.css';

// const ReviewerTable = () => {
//     const [selectedRows, setSelectedRows] = useState([]); 

    
//     const handleRowClick = (index) => {
//         if (selectedRows.includes(index)) {
//             setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
//         } else {
//             setSelectedRows([...selectedRows, index]);
//         }
//     };

//     return (
//         <div className="review-table-container">
//             <table className="review-table">
//                 <thead>
//                     <tr className="review-table-header">
//                         <th colSpan="5">분류명</th>
//                         <th>내용</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr onClick={() => handleRowClick(0)}>
//                         <td colSpan="5" className={`review-divide ${selectedRows.includes(0) ? 'selected' : ''}`}>사건명</td>
//                         <td className={`review-detail ${selectedRows.includes(0) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(1)}>
//                         <td colSpan="5" className={`review-divide ${selectedRows.includes(1) ? 'selected' : ''}`}>사건번호</td>
//                         <td className={`review-detail ${selectedRows.includes(1) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(2)}>
//                         <td colSpan="5" className={`review-divide ${selectedRows.includes(2) ? 'selected' : ''}`}>제출일자</td>
//                         <td className={`review-detail ${selectedRows.includes(2) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(3)}>
//                         <td colSpan="2" rowSpan="3" className={`review-divide ${selectedRows.includes(3) ? 'selected' : ''}`}>이유</td>
//                         <td colSpan="3" className={`review-divide ${selectedRows.includes(3) ? 'selected' : ''}`}>이유1</td>
//                         <td className={`review-detail ${selectedRows.includes(3) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(4)}>
//                         <td colSpan="3" className={`review-divide ${selectedRows.includes(4) ? 'selected' : ''}`}>이유2</td>
//                         <td className={`review-detail ${selectedRows.includes(4) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(5)}>
//                         <td colSpan="3" className={`review-divide ${selectedRows.includes(5) ? 'selected' : ''}`}>이유3</td>
//                         <td className={`review-detail ${selectedRows.includes(5) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(6)}>
//                         <td colSpan="2" rowSpan="2" className={`review-divide ${selectedRows.includes(6) ? 'selected' : ''}`}>사건명</td>
//                         <td colSpan="3" className={`review-divide ${selectedRows.includes(6) ? 'selected' : ''}`}>한글</td>
//                         <td className={`review-detail ${selectedRows.includes(6) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(7)}>
//                         <td colSpan="3" className={`review-divide ${selectedRows.includes(7) ? 'selected' : ''}`}>영어</td>
//                         <td className={`review-detail ${selectedRows.includes(7) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(8)}>
//                         <td colSpan="2" rowSpan="4" className={`review-divide ${selectedRows.includes(8) ? 'selected' : ''}`}>참조</td>
//                         <td colSpan="2" rowSpan="2" className={`review-divide ${selectedRows.includes(8) ? 'selected' : ''}`}>참조1</td>
//                         <td className={`review-divide ${selectedRows.includes(8) ? 'selected' : ''}`}>참조1-1</td>
//                         <td className={`review-detail ${selectedRows.includes(8) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(9)}>
//                         <td className={`review-divide ${selectedRows.includes(9) ? 'selected' : ''}`}>참조1-2</td>
//                         <td className={`review-detail ${selectedRows.includes(9) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(10)}>
//                         <td colSpan="2" rowSpan="2" className={`review-divide ${selectedRows.includes(10) ? 'selected' : ''}`}>참조2</td>
//                         <td className={`review-divide ${selectedRows.includes(10) ? 'selected' : ''}`}>참조2-1</td>
//                         <td className={`review-detail ${selectedRows.includes(10) ? 'selected' : ''}`}></td>
//                     </tr>
//                     <tr onClick={() => handleRowClick(11)}>
//                         <td className={`review-divide ${selectedRows.includes(11) ? 'selected' : ''}`}>참조2-2</td>
//                         <td className={`review-detail ${selectedRows.includes(11) ? 'selected' : ''}`}></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ReviewerTable;

//이게 1001 최종본 테이블



