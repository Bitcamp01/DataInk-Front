import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/reviewer.css';

const LabelSelectForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [isAdminInputChecked, setIsAdminInputChecked] = useState(false); // 관리자 별도 입력 체크박스 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수


    const handlePrevClick = () => {
        navigate('/label/detail');
    };
    const handleNextClick = () => {
        navigate('/label/detail');
    };

    return (
        <>
            {/* form-container 밖으로 submit-container 이동 */}
            <div className="review-submit-container" style={{padding:'1rem'}}>
                <button
                    className="prev-button"
                    onClick={handlePrevClick} // 반려 버튼 클릭 시 동작
                >
                    이전 작업으로 이동
                </button>
                <button
                    className="next-button"
                    onClick={handleNextClick} // 반려 버튼 클릭 시 동작
                >
                    다음 작업으로 이동
                </button>
            </div>
        </>
    );
};

export default LabelSelectForm;