import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import { useNavigate } from 'react-router-dom';
import '../css/reviewer.css';

const SelectForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [isAdminInputChecked, setIsAdminInputChecked] = useState(false); // 관리자 별도 입력 체크박스 상태
    const [selectedReasons, setSelectedReasons] = useState([]); // 선택된 이유 저장
    const [textareaContent, setTextareaContent] = useState(''); // textarea 내용 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    const handleApproveClick = () => {
        setIsModalOpen(true); // "승인" 버튼 클릭 시 모달 열기
    };

    const handlePrevClick = () => {
        navigate('/review'); // 이전 작업으로
    };

    const handleNextClick = () => {
        navigate('/review'); // 다음 작업으로
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const handleAdminInputChange = (e) => {
        setIsAdminInputChecked(e.target.checked); // 체크박스 상태 업데이트
    };

    const handleCheckboxChange = (reason) => {
        setSelectedReasons(prevState => {
            if (prevState.includes(reason)) {
                // 이미 선택된 경우, 선택 해제
                return prevState.filter(item => item !== reason);
            } else {
                // 선택되지 않은 경우, 선택
                return [...prevState, reason];
            }
        });
    };

    const handleTextareaChange = (e) => {
        setTextareaContent(e.target.value); // textarea 내용 업데이트
    };

    const handleRejectClick = () => {
        const userConfirmed = window.confirm('반려시키시겠습니까?'); // 반려 확인 메시지
        if (userConfirmed) {
            navigate('/label/work');
        } else {
            navigate('/review');
        }
    };

    const getFinalSubmission = () => {
        // 선택된 이유와 textarea 내용을 결합하여 최종 제출 문자열 생성
        const submissionReasons = selectedReasons.join(', '); // 선택된 이유를 쉼표로 구분하여 문자열로 변환
        return textareaContent ? `${submissionReasons} ${textareaContent}`.trim() : submissionReasons; // textarea 내용이 있을 경우 결합
    };

    return (
        <>
            <div className="form-container">
                <span className="nh4">변경 사유</span><span className="nexttoh4">(여러 사유 선택)</span>
                <div className="boxes">
                    <div className="checkboxes">
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('오타')} // "오타" 체크박스 클릭 시 처리
                                checked={selectedReasons.includes('오타')} // 체크 상태 관리
                            />
                            오타
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('내용 부족')} // "내용 부족" 체크박스 클릭 시 처리
                                checked={selectedReasons.includes('내용 부족')} // 체크 상태 관리
                            />
                            내용 부족
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('내용 불일치')} // "내용 불일치" 체크박스 클릭 시 처리
                                checked={selectedReasons.includes('내용 불일치')} // 체크 상태 관리
                            />
                            내용 불일치
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={handleAdminInputChange} // 관리자 별도 입력 체크박스 상태 변경 처리
                            />
                            관리자 별도 입력
                        </label>
                        <button className="select-button" onClick={handlePrevClick}>입력</button>
                    </div>
                    <div className="detailboxes">
                        <label>
                            <textarea
                                cols="60"
                                rows="5"
                                disabled={!isAdminInputChecked} // 체크박스가 선택되지 않으면 비활성화
                                value={textareaContent} // textarea 내용 관리
                                onChange={handleTextareaChange} // 내용 변경 시 상태 업데이트
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* form-container 밖으로 submit-container 이동 */}
            <div className="review-submit-container">
                <button className="prev-button" onClick={handlePrevClick}>이전 작업</button> {/* 이전 버튼 */}
                <button
                    className="reject-button"
                    onClick={handleRejectClick} // 반려 버튼 클릭 시 동작
                >
                    반려
                </button>
                <button
                    className="apply-button"
                    onClick={handleApproveClick} // 승인 버튼 클릭 시 모달 열기
                    disabled={selectedReasons.length > 0} // 하나라도 체크되면 비활성화
                >
                    승인
                </button> {/* 승인 버튼 */}
                <button className="next-button" onClick={handleNextClick}>다음 작업</button> {/* 다음 버튼 */}
            </div>

            <ReviewModal isOpen={isModalOpen} onClose={handleCloseModal} /> {/* 모달 렌더링 */}
        </>
    );
};

export default SelectForm;
