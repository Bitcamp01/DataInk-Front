import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateProfileImage, deleteProfileImage } from '../../apis/mypageApis';
import { setProfileImage } from '../../slices/mypageSlice';

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
    display: block;
    margin: auto;
    width: 60%;
    object-fit: cover;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    margin-top: 20px;
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

const ProfileImgModal = ({ isOpen, currentImage, defaultImage, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(currentImage);
    const [isDefaultImage, setIsDefaultImage] = useState(false);
    const [fileName, setFileName] = useState("선택된 파일 없음");
    const dispatch = useDispatch(); 


    // 파일이 변경되었을 때 미리보기 이미지 업데이트
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
            setIsDefaultImage(false);
            setFileName(file.name);
        }
    };

    // 기본 이미지로 설정
    const handleSetDefault = () => {
        dispatch(deleteProfileImage());
        setSelectedFile(null);
        setPreviewUrl(defaultImage);
        setIsDefaultImage(true);
        setFileName("기본 이미지로 설정됨");
    };
    const handleSaveProfile = async () => {
        if (selectedFile) {
            try {
                const { imageUrl } = await dispatch(updateProfileImage(selectedFile)).unwrap();
                dispatch(setProfileImage(imageUrl)); // Redux 상태 업데이트
            } catch (error) {
                console.error("Error uploading profile image:", error);
            }
        }
        onClose();
    };

    // 모달 열릴 때마다 미리보기 상태를 초기화
    useEffect(() => {
        setPreviewUrl(currentImage);
        setSelectedFile(null);
        setIsDefaultImage(false);
        setFileName("선택된 파일 없음");
    }, [currentImage, isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>프로필 이미지 수정</h2>
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
                    <ModalButton onClick={handleSaveProfile} disabled={!isDefaultImage && !selectedFile}>수정하기</ModalButton>
                </div>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ProfileImgModal;
