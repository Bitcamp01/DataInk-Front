import React from 'react';
import '../css/memberManagement.css';
import { Box, Typography, Button, TextField, IconButton, Avatar, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Notice_write = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      {/* 공지사항 제목 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" maxWidth="800px">
        <Typography variant="h5" fontWeight="bold">공지사항</Typography>
        <Box>
          {/* 검색창 (단순한 예시) */}
          <TextField variant="outlined" size="small" placeholder="검색" />
        </Box>
      </Box>

      {/* 공지사항 본문 */}
      <Paper elevation={3} sx={{ mt: 2, width: '100%', maxWidth: '800px', p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            {/* 작성자 아바타 */}
            <Avatar alt="작성자" src="/path/to/avatar.jpg" sx={{ width: 48, height: 48, mr: 2 }} />
            <Box>
              <Typography variant="body1">정소연</Typography>
              <Typography variant="body2" color="textSecondary">2024.09.19 14:25</Typography>
            </Box>
          </Box>

          {/* 수정 / 삭제 버튼 */}
          <Box>
            <Button variant="outlined" startIcon={<EditIcon />} sx={{ mr: 1 }}>수정</Button>
            <Button variant="outlined" startIcon={<DeleteIcon />}>삭제</Button>
          </Box>
        </Box>

        {/* 공지 내용 */}
        <Box mt={2}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            데이터 분류 작업시 순위를 두고 작업에 임해주시기 바랍니다.
            자세한 사항은 추후 공지 예정입니다.
          </Typography>
        </Box>

        {/* 댓글 입력 */}
        <Box mt={3}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="댓글을 입력해주세요."
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained">등록</Button>
          </Box>
        </Box>
      </Paper>

      {/* 이전글/다음글 */}
      <Box display="flex" justifyContent="center" mt={2} maxWidth="800px" width="100%">
        <Button color="primary" sx={{ mr: 2 }}>이전글</Button>
        <Button variant="contained" disabled>현재글</Button>
        <Button color="primary" sx={{ ml: 2 }}>다음글</Button>
      </Box>
    </Box>
  );
};

export default Notice_write;
