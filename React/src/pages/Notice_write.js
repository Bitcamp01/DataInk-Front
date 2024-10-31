import React,{ useCallback, useEffect, useState } from 'react';
import '../css/memberManagement.css';
import { Box, Typography, Button, TextField, IconButton, Avatar, Paper, List, ListItem, ListItemText, ListItemIcon  } from '@mui/material';
import InputFileUpload from '../components/InputFileUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch, useSelector } from 'react-redux';
import '../slices/userSlice';
import { post } from '../apis/noticeApis';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notice_write = () => {

  // 환경 변수에서 API URL 가져오기
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  // Redux에서 로그인한 사용자 정보 가져오기, 기본값으로 빈 객체 제공
  const user = useSelector((state) => state.userSlice || {});
  const { name: userName, profileImageUrl} = user;  // 'name'을 'userName'으로 변경

  const profileImg = profileImageUrl 
    ? `https://kr.object.ncloudstorage.com/dataink/${profileImageUrl}` 
    : '/icons/dataink-logo_icon.svg';

  //제목과 내용을 상태로 관리 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const [notice, setNotice] = useState({});

  const dispatch = useDispatch();
  const navi = useNavigate();

  const uploadFiles = [];

  //파일업로드 핸들러
  const handleFileChange =(selectedFiles) =>{
    setFiles(selectedFiles);
  };

  //등록 버튼 클릭 시 POST 요청을 보내는 함수 
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // input type='file'의 내용은 제외되고 폼데이터가 생성된다.
    const formData = new FormData(e.target);

    const formDataObj = {};

    formData.forEach((v, k) => formDataObj[k] = v);

    const noticeDto = new Blob([JSON.stringify(formDataObj)], {
        type: 'application/json'
    });

    const sendFormData = new FormData();

    sendFormData.append('noticeDto', noticeDto);

    Array.from(uploadFiles).forEach(file => sendFormData.append('uploadFiles', file));

    dispatch(post(sendFormData)).then((action) => {
        if(action.type === 'notice/post/fulfilled') {
            navi('/notice');
        }
    });

}, [dispatch, navi, uploadFiles]); 
  
  // if (!notice) {
  //   return null;
  // }
    
  return (
    <>
    {/* 콘텐츠 영역 */}
    <form onSubmit={handleSubmit}>
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
                  name='title'
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
                  <Avatar alt="작성자" src={profileImg} sx={{ width: 40, height: 40, mr: 2, mb: 3 }} />
                  <Box>
                  <Typography variant="body1" fontFamily="Pretendard">{userName}</Typography> 
                  </Box>
                </Box>
              </Box>

              {/* 공지 내용 입력 박스 */}
              <Box sx={{ minHeight: '450px' }}>
                <TextField
                  name='content'
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
              {/* 파일 업로드 컴포넌트 */}
              <InputFileUpload onFileChange={handleFileChange} 
            />


                {/* 파일 미리보기 */}
                <List sx={{ mt: 2 }}>
                  {Array.from(files).map((file, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {file.type.startsWith('image/') ? (
                          <ImageIcon />
                        ) : (
                          <InsertDriveFileIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        secondary={file.size > 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${file.size} B`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>

        

          {/* 등록 버튼 */}
          <Box display="flex" justifyContent="flex-end" mt={2} maxWidth="110%" width="103%">
            <Button 
              variant="contained"
              type='submit'
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
    </form>
  </>
)};

export default Notice_write;

