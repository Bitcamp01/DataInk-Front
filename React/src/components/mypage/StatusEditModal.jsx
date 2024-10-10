import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  max-width: 400px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  margin-bottom: 15px;
`;

const StatusInput = styled.input`
  width: 350px;
  height: 30px;
  padding: 10px;
  font-size: medium;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const PrimaryButton = styled.button`
  padding: 10px 20px;
  background-color: #7785be;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 20px;
  background-color: #e6e6e6;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #ccc;
  }
`;

const StatusEditModal = ({ isOpen, onClose, onSave }) => {
    const [status, setStatus] = useState('');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSave = () => {
        onSave(status);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalTitle>상태 수정</ModalTitle>
                <StatusInput
                    type="text"
                    value={status}
                    onChange={handleStatusChange}
                    placeholder="새 상태를 입력하세요"
                />
                <ModalButtons>
                    <PrimaryButton onClick={handleSave}>저장</PrimaryButton>
                    <SecondaryButton onClick={onClose}>취소</SecondaryButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

export default StatusEditModal;
