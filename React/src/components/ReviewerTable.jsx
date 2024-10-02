import React, { useState } from 'react';
import '../css/reviewer.css';

const ReviewerTable = () => {
    const [selectedRows, setSelectedRows] = useState([]); 

    
    const handleRowClick = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    return (
        <div className="review-table-container">
            <table className="review-table">
                <thead>
                    <tr className="review-table-header">
                        <th colSpan="5">분류명</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => handleRowClick(0)}>
                        <td colSpan="5" className={`review-divide ${selectedRows.includes(0) ? 'selected' : ''}`}>사건명</td>
                        <td className={`review-detail ${selectedRows.includes(0) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(1)}>
                        <td colSpan="5" className={`review-divide ${selectedRows.includes(1) ? 'selected' : ''}`}>사건번호</td>
                        <td className={`review-detail ${selectedRows.includes(1) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(2)}>
                        <td colSpan="5" className={`review-divide ${selectedRows.includes(2) ? 'selected' : ''}`}>제출일자</td>
                        <td className={`review-detail ${selectedRows.includes(2) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(3)}>
                        <td colSpan="2" rowSpan="3" className={`review-divide ${selectedRows.includes(3) ? 'selected' : ''}`}>이유</td>
                        <td colSpan="3" className={`review-divide ${selectedRows.includes(3) ? 'selected' : ''}`}>이유1</td>
                        <td className={`review-detail ${selectedRows.includes(3) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(4)}>
                        <td colSpan="3" className={`review-divide ${selectedRows.includes(4) ? 'selected' : ''}`}>이유2</td>
                        <td className={`review-detail ${selectedRows.includes(4) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(5)}>
                        <td colSpan="3" className={`review-divide ${selectedRows.includes(5) ? 'selected' : ''}`}>이유3</td>
                        <td className={`review-detail ${selectedRows.includes(5) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(6)}>
                        <td colSpan="2" rowSpan="2" className={`review-divide ${selectedRows.includes(6) ? 'selected' : ''}`}>사건명</td>
                        <td colSpan="3" className={`review-divide ${selectedRows.includes(6) ? 'selected' : ''}`}>한글</td>
                        <td className={`review-detail ${selectedRows.includes(6) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(7)}>
                        <td colSpan="3" className={`review-divide ${selectedRows.includes(7) ? 'selected' : ''}`}>영어</td>
                        <td className={`review-detail ${selectedRows.includes(7) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(8)}>
                        <td colSpan="2" rowSpan="4" className={`review-divide ${selectedRows.includes(8) ? 'selected' : ''}`}>참조</td>
                        <td colSpan="2" rowSpan="2" className={`review-divide ${selectedRows.includes(8) ? 'selected' : ''}`}>참조1</td>
                        <td className={`review-divide ${selectedRows.includes(8) ? 'selected' : ''}`}>참조1-1</td>
                        <td className={`review-detail ${selectedRows.includes(8) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(9)}>
                        <td className={`review-divide ${selectedRows.includes(9) ? 'selected' : ''}`}>참조1-2</td>
                        <td className={`review-detail ${selectedRows.includes(9) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(10)}>
                        <td colSpan="2" rowSpan="2" className={`review-divide ${selectedRows.includes(10) ? 'selected' : ''}`}>참조2</td>
                        <td className={`review-divide ${selectedRows.includes(10) ? 'selected' : ''}`}>참조2-1</td>
                        <td className={`review-detail ${selectedRows.includes(10) ? 'selected' : ''}`}></td>
                    </tr>
                    <tr onClick={() => handleRowClick(11)}>
                        <td className={`review-divide ${selectedRows.includes(11) ? 'selected' : ''}`}>참조2-2</td>
                        <td className={`review-detail ${selectedRows.includes(11) ? 'selected' : ''}`}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ReviewerTable;

//이게 1001 최종본 테이블



// import React from 'react';
// import '../css/reviewer.css';

// const ReviewerTable = () => {
//     return (
//         <div className="review-table-container">
//             <table className="review-table">
//                 <thead>
//                     <tr class="review-table-header">
//                         <th colspan="5">분류명</th>
//                         <th>내용</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td colspan="5" class="review-divide">사건명</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td colspan="5" class="review-divide">사건번호</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td colspan="5" class="review-divide">제출일자</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td colspan="2" rowspan="3" class="review-divide">이유</td>
//                         <td colspan="3" class="review-divide">이유1</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td colspan="3" class="review-divide">이유2</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td colspan="3" class="review-divide">이유3</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td colspan="2" rowspan="2" class="review-divide">사건명</td>
//                         <td colspan="3" class="review-divide">한글</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td colspan="3" class="review-divide">영어</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td colspan="2" rowspan="4" class="review-divide">참조</td>
//                         <td colspan="2" rowspan="2" class="review-divide">참조1</td>
//                         <td class="review-divide">참조1-1</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td class="review-divide">참조1-2</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td colspan="2" rowspan="2" class="review-divide">참조2</td>
//                         <td class="review-divide">참조2-1</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                     <tr>
//                         <td class="review-divide">참조2-2</td>
//                         <td class="review-detail"></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ReviewerTable;
// 밑의 테이블은 눌러도 응답 없는 테이블


