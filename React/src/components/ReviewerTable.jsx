import React from 'react';
import '../css/reviewer.css';

const ReviewerTable = () => {
    return (
        <div className="review-table-container">
            <table className="review-table">
                <thead>
                    <tr class="review-table-header">
                        <th colspan="5">분류명</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5" class="review-divide">사건명</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td colspan="5" class="review-divide">사건번호</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td colspan="5" class="review-divide">제출일자</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td colspan="2" rowspan="3" class="review-divide">이유</td>
                        <td colspan="3" class="review-divide">이유1</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td colspan="3" class="review-divide">이유2</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td colspan="3" class="review-divide">이유3</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td colspan="2" rowspan="2" class="review-divide">사건명</td>
                        <td colspan="3" class="review-divide">한글</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td colspan="3" class="review-divide">영어</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td colspan="2" rowspan="4" class="review-divide">참조</td>
                        <td colspan="2" rowspan="2" class="review-divide">참조1</td>
                        <td class="review-divide">참조1-1</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td class="review-divide">참조1-2</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td colspan="2" rowspan="2" class="review-divide">참조2</td>
                        <td class="review-divide">참조2-1</td>
                        <td class="review-detail"></td>
                    </tr>
                    <tr>
                        <td class="review-divide">참조2-2</td>
                        <td class="review-detail"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ReviewerTable;


// 실제로 데이터가 들어갈 때는 rowspan colspan을 이용해서 테이블을 조절해야 할 것 같다.