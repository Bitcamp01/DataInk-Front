import React, { useState } from 'react';
import ReviewModal from './ReviewModal';

const SelectForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [isAdminInputChecked, setIsAdminInputChecked] = useState(false); // 관리자 별도 입력 체크박스 상태

    const handleApproveClick = () => {
        setIsModalOpen(true); // "승인" 버튼 클릭 시 모달 열기
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const handleAdminInputChange = (e) => {
        setIsAdminInputChecked(e.target.checked); // 체크박스 상태 업데이트
    };

    return (
        <>
            <div className="form-container">
                <h4>변경 사유 (여러 사유 선택)</h4>
                <div className="boxes">
                    <div className="checkboxes">
                        <label><input type="checkbox" /> 오타</label>
                        <label><input type="checkbox" /> 내용 부족</label>
                        <label><input type="checkbox" /> 내용 불일치</label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={handleAdminInputChange} // 체크박스 상태 변경 처리
                            />
                            관리자 별도 입력
                        </label>
                    </div>
                    <div className="detailboxes">
                        <label>
                            <textarea
                                cols="30"
                                rows="5"
                                disabled={!isAdminInputChecked} // 체크박스가 선택되지 않으면 비활성화
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* form-container 밖으로 submit-container 이동 */}
            <div className="review-submit-container">
                <button className="reject-button">반려</button>
                <button className="apply-button" onClick={handleApproveClick}>승인</button> {/* 승인 버튼 */}
            </div>

            <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} /> {/* 모달 렌더링 */}
        </>
    );
};

export default SelectForm;
