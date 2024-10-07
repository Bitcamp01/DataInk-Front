import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/reviewer.css';

const LabelSelectForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [isAdminInputChecked, setIsAdminInputChecked] = useState(false); // 관리자 별도 입력 체크박스 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수


    const handleRejectClick = () => {
        const userConfirmed = window.confirm('검수자에게 검수 요청하시겠습니까??'); // 반려 확인 메시지
        if (userConfirmed) {
            navigate('/label/work');
        } else {
            navigate('/label/detail');
        }
    };

    return (
        <>
            {/* form-container 밖으로 submit-container 이동 */}
            <div className="review-submit-container" style={{padding:'1rem'}}>
                <button
                    className="approve-button"
                    onClick={handleRejectClick} // 반려 버튼 클릭 시 동작
                >
                    검수요청
                </button>
            </div>
        </>
    );
};

export default LabelSelectForm;