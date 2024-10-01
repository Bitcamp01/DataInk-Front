import React from 'react';
import '../css/memberManagement.css';
import { Box, Typography, Button, TextField, IconButton, Avatar, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Notice_write = () => {
  return (
  <>
    {/* 콘텐츠 영역 */}
    <section className="member-list">
      <Box display="flex" flexDirection="column" alignItems="center" p={2}  maxWidth='1135px'  minWidth='1135px' >

        {/* 공지사항 본문 */}
        <Paper elevation={3} sx={{ mt: 2, width: '100%', p: 4 ,borderRadius: '10px' ,boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',}}>
          <Box display="flex" flexDirection="column">

              {/* 제목 */}
           <Typography variant="h6" fontFamily="Pretendard" sx={{ mb: 3, height:'50px', borderBottom: 'solid 1.5px #eaeaea', }}>분류 작업시 주의사항</Typography>

            {/* 작성자 정보와 수정 / 삭제 버튼 */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" alignItems="center">

                  {/* 작성자 아바타 */}
                  <Avatar alt="작성자" src="/path/to/avatar.jpg" sx={{ width: 48, height: 48, mr: 2 , mb:3}} />
                  <Box>
                    <Typography variant="body1" fontFamily="Pretendard">정소연</Typography>
                    <Typography variant="body2"  fontFamily="Pretendard" color="textSecondary" sx={{ mb: 3}}>2024.09.19 14:25</Typography>
                  </Box>
                </Box>

                {/* 수정 / 삭제 버튼 */}
                <Box>
                  <Button variant="outlined"  startIcon={<EditIcon />} sx={{ padding: '0px', mr: 0, borderColor:'transparent', fontFamily:'Pretendard', color:'#7c97fe'}}>수정</Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />} sx={{padding: '0px',borderColor: 'transparent', fontFamily:'Pretendard', color:'#7c97fe'}}>삭제</Button>
                </Box>
              </Box>
            </Box>


          {/* 공지 내용 */}
          <Box mt={2}>
            <Typography variant="body1" fontFamily="Pretendard" sx={{  mb :10 }}>
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
              sx={{
                mb: 2,
                backgroundColor: '#efefef', // 배경색 설정
                borderRadius: '8px', // 모서리 둥글게 설정
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'transparent', // 내부 배경색 투명하게 설정
                  borderRadius: '10px', // 내부 모서리 둥글게 설정
                  padding: '10px', // 적절한 패딩 추가
                  '& fieldset': {
                    border: 'solid 0.5px #dbdbdb', // fieldset 테두리 완전히 없앰
                  },
                },
                '& .MuiInputBase-root': {
                  backgroundColor: 'transparent', // 입력 부분 배경 투명 설정
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#cacaca', // placeholder 색상 설정
                  opacity: 1, // placeholder의 투명도 설정 (1 = 불투명)
                  padding: '3px',
                },
               
              }}
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
      </section>
    </>
  );
};

export default Notice_write;
