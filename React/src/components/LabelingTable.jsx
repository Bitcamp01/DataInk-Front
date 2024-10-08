import React, { useState } from 'react';
import '../css/reviewer.css';

const LabelingTable = () => {
    const [tableData, setTableData] = useState({
        0: { cols: [{ colSpan: 5, text: '사건명' }, { colSpan: 5, text: 'as' }] },
        1: { cols: [{ colSpan: 5, text: '사건번호' }, { colSpan: 5, text: 'asvsasssssssssssssssssssssssssssssssssssv' }] },
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
        13: { cols: [{ colSpan: 3, text: '참조5' }, { colSpan: 5, text: '테스트' }] },
        14: { cols: [{ colSpan: 3, text: '참조6' }, { colSpan: 5, text: '' }] },
        15: { cols: [{ colSpan: 3, text: '참조7' }, { colSpan: 5, text: 'dvdasvdav' }] }
    });

    const [activeCells, setActiveCells] = useState({});
    const [cellInput, setCellInput] = useState({});
    const [editedCells, setEditedCells] = useState({});

    // 셀 클릭 시 활성화
    const handleCellClick = (rowIndex, colIndex) => {
        if (colIndex !== tableData[rowIndex].cols.length - 1) return;

        const key = `${rowIndex}-${colIndex}`;
        setActiveCells((prev) => ({
            ...prev,
            [key]: true
        }));
    };

    // 입력 변화 처리
    const handleInputChange = (e, rowIndex, colIndex) => {
        const key = `${rowIndex}-${colIndex}`;
        setCellInput((prev) => ({
            ...prev,
            [key]: e.target.value
        }));
    };

    // 엔터를 눌러서 수정된 내용을 저장
    const saveInput = (rowIndex, colIndex) => {
        const key = `${rowIndex}-${colIndex}`;
        setTableData((prevData) => {
            const newData = { ...prevData };
            newData[rowIndex].cols[colIndex].text = cellInput[key] || '';  // 빈 값도 허용
            return newData;
        });
        // 셀이 수정되었음을 기록하여 색상을 흰색으로 변경할 수 있도록 설정
        setEditedCells((prev) => ({
            ...prev,
            [key]: true
        }));
        setActiveCells((prev) => ({ ...prev, [key]: false }));
    };

    // 엔터 키 이벤트 처리
    const handleKeyDown = (e, rowIndex, colIndex) => {
        if (e.key === 'Enter') {
            saveInput(rowIndex, colIndex);
        }
    };

    // 셀의 색상을 설정하는 함수
    const getCellStyle = (rowIndex, colIndex, text) => {
        const key = `${rowIndex}-${colIndex}`;
        // 각 행의 마지막 셀에 대해서만 색상을 설정
        if (colIndex === tableData[rowIndex].cols.length - 1) {
            // 셀에 텍스트가 있고 수정된 적이 없으면 회색(#EDEDED)으로 표시
            if (text && !editedCells[key]) {
                return { backgroundColor: '#EDEDED' };
            }
        }
        // 엔터를 눌러 저장된 셀은 흰색으로 유지
        return { backgroundColor: 'white' };
    };

    return (
        <div className="label-table-container">
            <table className="review-table">
                <thead>
                    <tr className="review-table-header">
                        <th colSpan="5" className="main-font">분류명</th>
                        <th colSpan="10" className="main-font">내용</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(tableData).map(([rowIndex, row]) => (
                        <tr key={rowIndex}>
                            {row.cols.map((col, colIndex) => {
                                const isActive = activeCells[`${rowIndex}-${colIndex}`];
                                const key = `${rowIndex}-${colIndex}`;
                                const adjustedColSpan = colIndex === row.cols.length - 1
                                    ? col.colSpan * 2
                                    : col.colSpan;

                                return (
                                    <td
                                        key={colIndex}
                                        colSpan={adjustedColSpan}
                                        rowSpan={col.rowSpan || 1}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        // 셀 색상을 설정하는 함수 호출
                                        style={getCellStyle(rowIndex, colIndex, col.text)}
                                    >
                                        {isActive ? (
                                            <input
                                                type="text"
                                                className="input-field"
                                                value={cellInput[key] !== undefined ? cellInput[key] : col.text}  // undefined일 때만 col.text 사용
                                                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                                                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                                            />
                                        ) : (
                                            col.text || ''  // 빈 셀도 처리
                                        )}
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

export default LabelingTable;
