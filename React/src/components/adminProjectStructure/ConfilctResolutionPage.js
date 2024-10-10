import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

export default function ConflictResolutionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientData, serverData } = location.state;

  const handleKeepServerVersion = () => {
    // 서버 버전을 유지하므로 아무런 변경 없이 홈으로 돌아감
    navigate('/');
  };

  const handleKeepClientVersion = async () => {
    // 클라이언트 버전을 서버에 강제로 업데이트
    try {
      const response = await fetch(`/api/folder/${clientData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      if (!response.ok) throw new Error('Failed to update with client version');
      
      navigate('/');
    } catch (error) {
      console.error('Error keeping client version:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6">충돌 관리</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        이 항목은 다른 사용자에 의해 수정되었습니다. 어느 버전을 유지할지 선택하십시오.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">서버 버전:</Typography>
        <pre>{JSON.stringify(serverData, null, 2)}</pre>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">내 버전:</Typography>
        <pre>{JSON.stringify(clientData, null, 2)}</pre>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleKeepServerVersion}>
          서버 버전 유지
        </Button>
        <Button variant="contained" color="secondary" onClick={handleKeepClientVersion}>
          내 버전 유지
        </Button>
      </Box>
    </Box>
  );
}
