import React from 'react';
import '../css/memberManagement.css';
import { Box, Typography, Button, TextField, IconButton, Avatar, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Notice_write = () => {
  return (
    <>
    {/* 콘텐츠 영역 */}
    <section className="member-list">
      <Box display="flex" flexDirection="column" alignItems="center" p={2} maxWidth="1135px" minWidth="1135px">

        {/* 공지사항 본문 */}
        <Paper
          elevation={3}
          sx={{
            mt: -2,
            minHeight: '600px',
            width: '100%',
            p: 4,
            borderRadius: '10px',
            flexDirection: 'column', // 위에서 아래로 배치
            justifyContent: 'space-between', // 댓글 창을 하단으로 밀기 위한 설정
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box display="flex" flexDirection="column">

            {/* 제목 */}
            
              <TextField
                fullWidth
                variant="outlined" 
                placeholder="제목을 입력하세요" 
                sx={{
                  mb: 3,
                  height: '50px',
                  borderBottom: 'solid 1.5px #eaeaea', 
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'Pretendard',
                    fontSize: '1.25rem', 
                    padding: '0px', 
                    '& fieldset': {
                      border: 'none', 
                    },
                  },
                }}
              />

            {/* 작성자 정보와 수정 / 삭제 버튼 */}
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box display="flex" alignItems="center">
                {/* 작성자 아바타 */}
                <Avatar alt="작성자" src="/path/to/avatar.jpg" sx={{ width: 40, height: 40, mr: 2, mb: 3 }} />
                <Box>
                  <Typography variant="body1" fontFamily="Pretendard">정소연</Typography>
                  <Typography variant="body2" fontFamily="Pretendard" color="textSecondary" sx={{ mb: 3 }}>2024.09.19 14:25</Typography>
                </Box>
              </Box>
            </Box>

            {/* 공지 내용 입력 박스 */}
            <Box sx={{ minHeight: '450px' }}>
              <TextField
                fullWidth
                multiline
                rows={10} // 입력 필드의 높이를 조절 (줄 수 설정)
                placeholder="내용을 입력하세요."
                variant="outlined"
                sx={{
                  backgroundColor: '#ffffff', // 배경색 설정
                  borderRadius: '8px', // 모서리 둥글게 설정
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px', // 내부 모서리 둥글게 설정
                    padding: '10px', // 적절한 패딩 추가
                    '& fieldset': {
                      border: 'transparent', // 테두리 색상 설정
                    },
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: 'transparent', // 내부 배경 투명 설정
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#cacaca', // placeholder 색상 설정
                    opacity: 1, // placeholder 투명도 설정
                    padding: '3px',
                  },
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* 등록 버튼 */}
        <Box display="flex" justifyContent="flex-end" mt={2} maxWidth="110%" width="103%">
          <Button 
            variant="contained"
            sx={{ 
              fontSize:'15px',
              width:'150px',
              height: '45px',
              mr: 2, 
              fontFamily: 'Pretendard', 
              backgroundColor: "#7C97FE", // 배경 색상 설정
              color: "#FFFFFF",           // 텍스트 색상 설정
              '&:hover': {                // hover 시 색상 변경
                backgroundColor: "#6B88E6", // hover 상태의 배경 색상
              }
            }}
          >
          등록
        </Button>
        </Box>
      </Box>
    </section>
  </>
);
};

export default Notice_write;

