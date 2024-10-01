import React from 'react';
import '../css/reviewer.css'; // 모달 스타일이 여기에 포함된다고 가정

const ReviewModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // 모달이 열리지 않았을 경우 렌더링하지 않음

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3></h3>
                    <button onClick={onClose} className="close-button">X</button> {/* 모달 닫기 버튼 */}
                </div>
                <div className="profile-section">
                    <img src={`${process.env.PUBLIC_URL}/images/profile_img.png`} alt="Profile" className="profile-image" />
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
                    <textarea placeholder="특이사항을 입력하세요" rows="5" className="feedbackarea"></textarea>
                </div>
                <div className="modal-footer">
                    <button className="approve-button">승인</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
