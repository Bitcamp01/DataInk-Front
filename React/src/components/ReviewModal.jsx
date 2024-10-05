import React from 'react';
import '../css/memberManagement.css';
import IconButton from '@mui/material/IconButton';  
import CloseIcon from '@mui/icons-material/Close'; 
import '../css/reviewer.css';
import { useNavigate } from 'react-router-dom'; // useNavigate import

const ReviewModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    if (!isOpen) return null; // 모달이 열리지 않았을 경우 렌더링하지 않음

    const handleApplyClick = () => {
        setTimeout(() => {
            navigate('/label/work');
        }, 1000); // 1초(1000ms) 지연
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3></h3>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}  // X 버튼을 클릭하면 모달 닫기
                        sx={{
                            position: 'relative',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],  // X 버튼 색상
                        }}
                    >
                        <CloseIcon />
                    </IconButton> {/* 모달 닫기 버튼 */}
                </div>
                <div className="profile-section">
                    <img src={`${process.env.PUBLIC_URL}/images/profile_img.png`} alt="Profile" className="review-profile-image" />
                    <div className="profile-details">
                        <p style={{ margin: '0 0 1rem 0' }}>
                            <strong className="modal-labelingname">고기천</strong>님의 작업입니다
                        </p>
                        <p style={{ margin: '0.5rem 0' }}>AI Clova | 인턴 (라벨러)</p>
                        <p style={{ margin: '0.5rem 0' }}>참여중인 작업: 5건</p>
                        <p style={{ margin: '0.5rem 0' }}>완료한 작업: 12503건</p>
                    </div>
                </div>
                <div className="report-section">
                    <h4 style={{ color: '#7C97FE', margin: '0.5rem 0' }}>작업 특이사항</h4>
                    <p style={{ margin: '0.5rem 0' }}>페이지 수: 5 페이지</p>
                    <p style={{ margin: '0.5rem 0' }}>작업 소요시간: 0.38시간</p>
                    <p style={{ margin: '0.5rem 0' }}>반려 횟수: 0회</p>
                    <textarea placeholder="특이사항을 입력하세요" rows="5" className="feedbackarea"
                    style={{ 
                        resize: 'none'
                    }}
                    ></textarea>
                </div>
                <div className="modal-footer">
                    <button className="approve-button" onClick={handleApplyClick}>승인</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
