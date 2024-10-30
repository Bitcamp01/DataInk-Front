import React, { useEffect, useState } from 'react'; // useEffect, useState와 함께 React import
import { Box, Typography, Button, TextField, Avatar, Paper } from '@mui/material';

import { Navigate, useParams, useNavigate } from 'react-router-dom'; // useParams로 URL 파라미터 가져오기
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const Notice_detail = () => {
  const { id } = useParams(); // URL에서 공지사항 ID 추출
  const [notice, setNotice] = useState(null);
  const noticeList = useSelector(state => state.noticeSlice.notice); // 공지사항 리스트 가져오기

  const navigate = useNavigate(); // navigate를 컴포넌트의 최상단에서 호출
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editedContent, setEditedContent] = useState(''); // 수정된 내용 상태


  useEffect(() => {
    // 공지사항 리스트에서 ID에 해당하는 데이터 찾기
    const selectedNotice = noticeList.content.find(item => item.noticeId === parseInt(id));
    setNotice(selectedNotice);

    setEditedContent(selectedNotice?.content || ''); // 초기값 설정

  }, [id, noticeList]);

  if (!notice) {
    return null; // 빈 화면 처리
  }


  const handledelete = async () => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    try {
      await axios.delete(`http://localhost:9090/notice/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      alert('정상적으로 삭제되었습니다.');
      // 삭제 후 공지사항 페이지로 이동하기
      navigate('/notice'); // navigate를 호출하여 페이지 이동
    } catch(error) {
      console.error('공지사항 삭제 실패: ', error);
      alert('삭제에 실패했습니다. 관리자에게 문의하세요.');
    }
  };
  const handleEdit = async () => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    try {
      // 공지사항 수정 요청
      await axios.patch(`http://localhost:9090/notice/${id}`, {
        content: editedContent, // 수정된 내용
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      
      setNotice(prev => ({ ...prev, content: editedContent })); // 상태 업데이트
      setIsEditing(false); // 수정모드 종료
      alert('수정이 정상적으로 완료되었습니다.');
    } catch (error) {
      console.error('공지사항 수정 실패: ', error);
      alert('수정에 실패했습니다. 관리자에게 문의하세요.');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      {/* 콘텐츠 영역 */}
      <section className="member-list">
        <Box display="flex" flexDirection="column" alignItems="center" p={2}  maxWidth='1135px'  minWidth='1135px' >
          {/* 공지사항 본문 */}
          <Paper elevation={3} 
            sx={{ mt: -2,  
            minHeight: '600px', 
            width: '100%', p: 4 ,
            borderRadius: '10px' ,
            flexDirection: 'column', // 위에서 아래로 배치
            justifyContent: 'space-between', // 댓글 창을 하단으로 밀기 위한 설정
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',}}
          >
            <Box display="flex" flexDirection="column">
              {/* 제목 */}
              <Typography variant="h6" fontFamily="Pretendard" sx={{ mb: 3, height:'50px', borderBottom: 'solid 1.5px #eaeaea', }}>{notice.title}</Typography>

              {/* 작성자 정보와 수정 / 삭제 버튼 */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" alignItems="center">

  return (
  <>
    {/* 콘텐츠 영역 */}
    <section className="member-list">
      <Box display="flex" flexDirection="column" alignItems="center" p={2}  maxWidth='1135px'  minWidth='1135px' >

        {/* 공지사항 본문 */}
        <Paper elevation={3} 
          sx={{ mt: -2,  
          minHeight: '600px', 
          width: '100%', p: 4 ,
          borderRadius: '10px' ,
          flexDirection: 'column', // 위에서 아래로 배치
          justifyContent: 'space-between', // 댓글 창을 하단으로 밀기 위한 설정
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',}}
        >
          <Box display="flex" flexDirection="column">

              {/* 제목 */}
           <Typography variant="h6" fontFamily="Pretendard" sx={{ mb: 3, height:'50px', borderBottom: 'solid 1.5px #eaeaea', }}>{notice.title}</Typography>

            {/* 작성자 정보와 수정 / 삭제 버튼 */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" alignItems="center">
                  {/* 작성자 아바타 */}
                  <Avatar alt="작성자" src="/path/to/avatar.jpg" sx={{ width: 40, height: 40, mr: 2 , mb:3}} />
                  <Box>
                    <Typography variant="body1" fontFamily="Pretendard">{notice.name}</Typography>
                    <Typography variant="body2"  fontFamily="Pretendard" color="textSecondary" sx={{ mb: 3}}>{new Date(notice.created).toLocaleString()}</Typography>
                  </Box>
                </Box>

                {/* 수정 / 삭제 버튼 */}
                <Box>

                  {isEditing ? (
                    // 수정 모드일 때 등록 버튼 표시
                    <Button variant="outlined" onClick={handleEdit} sx={{ padding: '0px', borderColor: 'transparent', fontFamily: 'Pretendard', color: '#7c97fe' }}>
                      등록
                    </Button>
                  ) : (
                    // 수정 모드가 아닐 때 수정 및 삭제 버튼 표시
                    <>
                      <Button variant="outlined" startIcon={<EditIcon />} sx={{ padding: '0px', borderColor: 'transparent', fontFamily: 'Pretendard', color: '#7c97fe' }} onClick={handleEditClick}>
                        수정
                      </Button>
                      <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ padding: '0px', borderColor: 'transparent', fontFamily: 'Pretendard', color: '#7c97fe' }} onClick={handledelete}>
                        삭제
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Box>

            {/* 공지 내용 */}
            <Box sx={{ minHeight: '300px' }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="body1" fontFamily="Pretendard" sx={{color:"#3e3e3e"}}>
                  {notice.content}
                </Typography>
              )}
            </Box>

            {/* 댓글 입력 */}
            <Box mt="auto">
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
                      border: 'solid 0.5px #dbdbdb', // 기본 테두리 색상
                    },
                    '&:hover fieldset': {
                      borderColor: '#7C97FE',
                      borderWidth: '1.5px', 
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7C97FE', 
                      borderWidth: '1.5px', 
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
                <Button variant="contained"
                sx={{ fontFamily: 'Pretendard', backgroundColor: "#7c97fe"}}
                onClick={() => {
                  alert('댓글이 정상적으로 등록되었습니다.');
                }}
                >등록</Button>
              </Box>
            </Box>
          </Paper>

          {/* 이전글/다음글 */}
          <Box display="flex" justifyContent="center" mt={2} maxWidth="800px" width="100%">
            <Button startIcon={<ArrowBackIcon />} sx={{ mr: 2 , fontFamily: 'Pretendard', color: "#7C97FE" }}>이전글</Button>
            <Button variant="contained" disabled   
            sx={{
                fontFamily: 'Pretendard', 
                '&.Mui-disabled': {         // disabled 상태일 때의 스타일
                  backgroundColor: '#e3e8f9', 
                  color: '#7c97fe',        
                  }  
              }}>현재글</Button>
            <Button  endIcon={<ArrowForwardIcon />}  sx={{ ml: 2 , fontFamily: 'Pretendard',color: "#7C97FE" }}>다음글</Button>
          </Box>
        </Box>
      </section>
    </>
  );
};

export default Notice_detail;
