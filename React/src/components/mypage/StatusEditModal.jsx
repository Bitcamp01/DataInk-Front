import React, { useState } from 'react';
import '../../css/profile.css';

const StatusEditModal = ({ isOpen, onClose, onSave }) => {
    const [status, setStatus] = useState('');

    // 상태 변경 핸들러
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    // 저장 버튼 클릭 시
    const handleSave = () => {
        onSave(status);
        onClose();
    };

    // 모달이 열려있지 않으면 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className="status_modal">
            <div className="status_modal--content">
                <h2>상태 수정</h2>
                <input
                    type="text"
                    value={status}
                    onChange={handleStatusChange}
                    className="profile-form__input-container"
                    placeholder="새 상태를 입력하세요"
                />
                <div className="status-modal-buttons">
                    {/* 저장 버튼 */}
                    <button className="profile-form__button" onClick={handleSave}>
                        저장
                    </button>
                    {/* 취소 버튼 */}
                    <button className="profile-form__button" onClick={onClose}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusEditModal;
