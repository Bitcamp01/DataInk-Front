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
        13: { cols: [{ colSpan: 3, text: '참조5' }, { colSpan: 5, text: '테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트' }] },
        14: { cols: [{ colSpan: 3, text: '참조6' }, { colSpan: 5, text: '' }] },
        15: { cols: [{ colSpan: 3, text: '참조7' }, { colSpan: 5, text: 'dvdasvdav' }] }
    });

    const [activeCells, setActiveCells] = useState({});
    const [cellInput, setCellInput] = useState({});

    const handleCellClick = (rowIndex, colIndex) => {
        const key = `${rowIndex}-${colIndex}`;
        setActiveCells((prev) => ({
            ...prev,
            [key]: true
        }));
    };

    const handleInputChange = (e, rowIndex, colIndex) => {
        const key = `${rowIndex}-${colIndex}`;
        setCellInput((prev) => ({
            ...prev,
            [key]: e.target.value
        }));
    };

    const saveInput = (rowIndex, colIndex) => {
        const key = `${rowIndex}-${colIndex}`;
        setTableData((prevData) => {
            const newData = { ...prevData };
            newData[rowIndex].cols[colIndex].text = cellInput[key] || '';
            return newData;
        });
        setActiveCells((prev) => ({ ...prev, [key]: false }));
    };

    const handleInputBlur = (rowIndex, colIndex) => {
        saveInput(rowIndex, colIndex);
    };

    const handleKeyDown = (e, rowIndex, colIndex) => {
        if (e.key === 'Enter') {
            saveInput(rowIndex, colIndex);
        }
    };

    const calculateContentColSpan = (classificationColSpan) => {
        return classificationColSpan * 2;
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
                                    ? calculateContentColSpan(row.cols[0].colSpan)
                                    : col.colSpan;

                                return (
                                    <td
                                        key={colIndex}
                                        colSpan={adjustedColSpan}
                                        rowSpan={col.rowSpan || 1}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                    >
                                        {isActive ? (
                                            <input
                                                type="text"
                                                className="input-field"
                                                value={cellInput[key] || col.text}
                                                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                                                onBlur={() => handleInputBlur(rowIndex, colIndex)}
                                                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)} // 엔터 키 이벤트 추가
                                            />
                                        ) : (
                                            col.text
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
