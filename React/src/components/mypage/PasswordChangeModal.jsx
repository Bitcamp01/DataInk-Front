import React, { useState, useCallback, useMemo } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';
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
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1001;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const PrimaryButton = styled(Button)`
  background-color: #7785be !important;
  color: white !important;
  &:hover {
    background-color: #2980b9 !important;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #e6e6e6 !important;
  color: #333 !important;
`;

// 유저 정보 관리 컴포넌트
const PasswordChangeModal = ({ isOpen, onClose, userPassword }) => {
    const [userInfo, setUserInfo] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const actualCurrentPassword = userPassword || "!dkdlxl1234";

    const validatePassword = useCallback(() => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{9,}$/;
        return regex.test(userInfo.newPassword);
    }, [userInfo.newPassword]);

    const isPasswordValid = useMemo(() => validatePassword(), [validatePassword]);

    const handlePasswordChange = useCallback(() => {
        const { currentPassword, newPassword, confirmNewPassword } = userInfo;

        if (currentPassword !== actualCurrentPassword) {
            alert('현재 비밀번호가 일치하지 않습니다.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!isPasswordValid) {
            alert('비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 지정해야 합니다.');
            return;
        }

        alert('비밀번호가 성공적으로 변경되었습니다!');
        onClose();
    }, [userInfo, actualCurrentPassword, isPasswordValid, onClose]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    }, []);

    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <Typography variant="h5" gutterBottom>
                    비밀번호 변경
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            label="현재 비밀번호"
                            name="currentPassword"
                            value={userInfo.currentPassword}
                            onChange={handleInputChange}
                        />
                        <Typography
                            variant="body2"
                            color={userInfo.currentPassword === actualCurrentPassword ? "green" : "red"}
                            style={{ marginTop: '8px' }}
                        >
                            {userInfo.currentPassword === actualCurrentPassword 
                                ? "현재 비밀번호가 일치합니다." 
                                : userInfo.currentPassword ? "현재 비밀번호가 일치하지 않습니다." : ""}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            label="새 비밀번호"
                            name="newPassword"
                            value={userInfo.newPassword}
                            onChange={handleInputChange}
                        />
                        <Typography
                            variant="body2"
                            color={isPasswordValid ? "green" : "red"}
                            style={{ marginTop: '8px' }}
                        >
                            {isPasswordValid 
                                ? "비밀번호가 유효합니다." 
                                : "비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 지정하세요."}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            label="새 비밀번호 확인"
                            name="confirmNewPassword"
                            value={userInfo.confirmNewPassword}
                            onChange={handleInputChange}
                        />
                        <Typography
                            variant="body2"
                            color={userInfo.newPassword === userInfo.confirmNewPassword && userInfo.confirmNewPassword ? "green" : "red"}
                            style={{ marginTop: '8px' }}
                        >
                            {userInfo.newPassword === userInfo.confirmNewPassword && userInfo.confirmNewPassword 
                                ? "비밀번호가 일치합니다." 
                                : "비밀번호가 일치하지 않습니다."}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ModalButtons>
                            <PrimaryButton variant="contained" onClick={handlePasswordChange}>
                                변경하기
                            </PrimaryButton>
                            <SecondaryButton variant="outlined" onClick={onClose}>
                                취소
                            </SecondaryButton>
                        </ModalButtons>
                    </Grid>
                </Grid>
            </ModalContent>
        </ModalOverlay>
    );
};

export default PasswordChangeModal;
