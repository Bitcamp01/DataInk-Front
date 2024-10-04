import React, { useState, useCallback, useMemo } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import '../../css/profile.css';

// 유저 정보 관리 컴포넌트
const PasswordChangeModal = ({ isOpen, onClose, userPassword }) => {
    // 유저 정보 상태 관리
    const [userInfo, setUserInfo] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    // 실제 현재 비밀번호 (추후 실제 API 응답에서 가져올 것으로 가정)
    const actualCurrentPassword = userPassword || "!dkdlxl1234";

    // 비밀번호 유효성 검사 함수 (useCallback 사용)
    const validatePassword = useCallback(() => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{9,}$/;
        return regex.test(userInfo.newPassword);
    }, [userInfo.newPassword]);

    // 유효성 검사 결과 메모이제이션
    const isPasswordValid = useMemo(() => validatePassword(), [validatePassword]);

    // 비밀번호 변경 핸들러 (useCallback 사용)
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

        // API 호출 로직 (비밀번호 변경 요청)
        // 예시: axios.post('/api/change-password', { newPassword })
        alert('비밀번호가 성공적으로 변경되었습니다!');
        onClose();
    }, [userInfo, actualCurrentPassword, isPasswordValid, onClose]);

    // 입력 필드 변경 핸들러 (useCallback 사용)
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    }, []);

    if (!isOpen) return null;

    return (
        <Container className="password-modal-overlay">
            <div className="password-modal">
                <Typography variant="h5" gutterBottom>
                    비밀번호 변경
                </Typography>
                <Grid container spacing={2}>
                    {/* 현재 비밀번호 입력 */}
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
                    {/* 새 비밀번호 입력 */}
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
                    {/* 새 비밀번호 확인 입력 */}
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
                    <Grid item xs={12} className="password-modal-buttons">
                        <Button variant="contained" color="primary" onClick={handlePasswordChange}>
                            변경하기
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onClose}>
                            취소
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default PasswordChangeModal;
