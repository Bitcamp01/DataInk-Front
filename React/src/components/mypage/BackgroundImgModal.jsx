import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const PreviewImage = styled.img`
    margin-top: 20px;
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 15px;
    border: 1px solid #ccc;
`;

const ModalButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
`;

const FileInputContainer = styled.div`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
`;

const FileLabel = styled.label`
    margin-right: 10px;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

const FileName = styled.span`
    font-size: 14px;
    color: #666;
`;

const BackgroundImgModal = ({ isOpen, currentImage, defaultImage, onClose, onSave, onSetDefault }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(currentImage); // 현재 이미지로 초기화
    const [isDefaultImage, setIsDefaultImage] = useState(false); // 기본 이미지 여부 상태
    const [fileName, setFileName] = useState("선택된 파일 없음"); // 파일 이름

    // 파일이 변경되었을 때 미리보기 이미지 업데이트
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewUrl(previewUrl); // 미리보기 URL 설정
            setIsDefaultImage(false); // 기본 이미지 상태 해제
            setFileName(file.name); // 파일 이름을 표시
        }
    };

    // 기본 이미지로 설정
    const handleSetDefault = () => {
        setSelectedFile(null); // 선택된 파일 초기화
        setPreviewUrl(defaultImage); // 기본 이미지로 미리보기 설정
        setIsDefaultImage(true); // 기본 이미지 상태로 설정
        setFileName("기본 이미지로 설정됨"); // 파일 이름을 "기본 이미지로 설정됨"으로 표시
    };

    // 수정 버튼 클릭 시
    const handleSave = () => {
        if (isDefaultImage) {
            onSetDefault(); // 기본 이미지로 설정
        } else if (selectedFile) {
            onSave(selectedFile); // 파일이 있을 경우 저장
        }
        onClose(); // 모달 닫기
    };

    // 모달 열릴 때마다 미리보기 상태를 초기화
    useEffect(() => {
        setPreviewUrl(currentImage);
        setSelectedFile(null); // 새로운 파일을 선택하지 않은 상태로 초기화
        setIsDefaultImage(false); // 기본 이미지 상태 해제
        setFileName("선택된 파일 없음"); // 모달 열릴 때 파일 이름 초기화
    }, [currentImage, isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>배경 이미지 수정</h2>
                {previewUrl ? (
                    <PreviewImage src={previewUrl} alt="미리보기 이미지" />
                ) : (
                    <p>이미지를 선택하세요</p>
                )}
                <FileInputContainer>
                    <FileLabel htmlFor="file-input">파일 선택</FileLabel>
                    <input 
                        id="file-input" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }}
                    />
                    <FileName>{fileName}</FileName> {/* 파일 이름 또는 상태 표시 */}
                </FileInputContainer>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ModalButton onClick={handleSetDefault}>기본이미지로 설정</ModalButton>
                    <ModalButton onClick={onClose}>취소</ModalButton>
                    <ModalButton onClick={handleSave} disabled={!isDefaultImage && !selectedFile}>수정하기</ModalButton>
                </div>
            </ModalContent>
        </ModalOverlay>
    );
};

export default BackgroundImgModal;
