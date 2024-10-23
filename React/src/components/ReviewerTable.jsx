import React, { useState } from 'react';
import '../css/reviewer.css';

const ReviewerTable = () => {
    const [tableData, setTableData] = useState({
        0: { cols: [{ colSpan: 5, text: '사건명' }, { colSpan: 5, text: 'as' }] },
        1: { cols: [{ colSpan: 5, text: '사건번호' }, { colSpan: 5, text: 'asvsasssssssssssssssssssssssssssssssv' }] },
        2: { cols: [{ colSpan: 5, text: '제출일자' }, { colSpan: 5, text: 'savdavad' }] },
        3: { cols: [{ colSpan: 2, rowSpan: 4, text: '이유' }, { colSpan: 3, text: '이유1' }, { colSpan: 5, text: 'advadvda' }] },
        4: { cols: [{ colSpan: 3, text: '이유2' }, { colSpan: 5, text: '' }] },
        5: { cols: [{ colSpan: 3, text: '이유3' }, { colSpan: 5, text: 'zxvdzv' }] },
        6: { cols: [{ colSpan: 3, text: '이유4' }, { colSpan: 5, text: 'advdav' }] },
        7: { cols: [{ colSpan: 2, rowSpan: 2, text: '사건명' }, { colSpan: 3, text: '한글' }, { colSpan: 5, text: 'zxvdvvz' }] },
        8: { cols: [{ colSpan: 3, text: '영어' }, { colSpan: 5, text: 'advdvaad' }] },
        9: { cols: [{ colSpan: 2, rowSpan: 7, text: '참조' }, { colSpan: 3, text: '참조1' }, { colSpan: 5, text: '' }] },
        10: { cols: [{ colSpan: 3, text: '참조2' }, { colSpan: 5, text: '' }] },
        11: { cols: [{ colSpan: 3, text: '참조3' }, { colSpan: 5, text: 'davdavxda' }] },
        12: { cols: [{ colSpan: 3, text: '참조4' }, { colSpan: 5, text: '' }] },
        13: { cols: [{ colSpan: 3, text: '참조5' }, { colSpan: 5, text: '테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트' }] },
        14: { cols: [{ colSpan: 3, text: '참조6' }, { colSpan: 5, text: '' }] },
        15: { cols: [{ colSpan: 3, text: '참조7' }, { colSpan: 5, text: 'dvdasvdav' }] }
    });

    // 클릭한 셀의 상태를 저장할 객체
    const [activeCells, setActiveCells] = useState({});

    const handleCellClick = (rowIndex) => {
        const lastColIndex = tableData[rowIndex].cols.length - 1;
        const key = `${rowIndex}-${lastColIndex}`;

        setActiveCells((prev) => ({
            ...prev,
            [key]: !prev[key] // 클릭 시 상태 토글
        }));
    };

    const calculateContentColSpan = (classificationColSpan) => {
        return classificationColSpan * 2; // 분류명의 colSpan에 2배로 설정
    };

    return (
        <div className="review-table-container">
            <table className="review-table">
                <thead>
                    <tr className="review-table-header">
                        <th colSpan="5" className="main-font">분류명</th>
                        <th colSpan="10" className="main-font">내용</th> {/* 내용은 2배로 설정 */}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(tableData).map(([rowIndex, row]) => (
                        <tr key={rowIndex}>
                            {row.cols.map((col, colIndex) => {
                                const isActive = activeCells[`${rowIndex}-${colIndex}`]; // 클릭 상태 확인
                                
                                // 마지막 열일 경우, 분류명의 colSpan의 2배 적용
                                const adjustedColSpan = colIndex === row.cols.length - 1
                                    ? calculateContentColSpan(row.cols[0].colSpan)
                                    : col.colSpan;

                                return (
                                    <td
                                        key={colIndex}
                                        colSpan={adjustedColSpan}
                                        rowSpan={col.rowSpan || 1}
                                        className={`review-divide ${isActive ? 'active' : ''}`}
                                        onClick={() => handleCellClick(rowIndex)}
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