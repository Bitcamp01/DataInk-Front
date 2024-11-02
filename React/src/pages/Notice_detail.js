import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Avatar, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import InputFileUpload from '../components/InputFileUpload';

const Notice_detail = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const noticeList = useSelector(state => state.noticeSlice.notice);

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const selectedNotice = noticeList.content.find(item => item.noticeId === parseInt(id));
    setNotice(selectedNotice);
    setEditedContent(selectedNotice?.content || '');
  }, [id, noticeList]);

  if (!notice) {
    return null;
  }

  const userData = sessionStorage.getItem('persist:root');
  let userId = null;
  if(userData) {
    const parsedData = JSON.parse(userData);
    const userSlice = JSON.parse(parsedData.userSlice);

    userId = userSlice.userId;
  } else {
    console.log("세션 스토리지에 사용자 데이터가 없습니다.");
  }

  const handleEdit = async () => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    try {
      await axios.patch(`${API_BASE_URL}/notice/${id}`, {
        content: editedContent,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      alert('수정이 정상적으로 완료되었습니다.');
      setNotice(prev => ({ ...prev, content: editedContent }));
      setIsEditing(false);
    } catch (error) {
      console.error('공지사항 수정 실패: ', error);
      alert('수정에 실패했습니다. 관리자에게 문의하세요.');
    }
  };

  const handleDelete = async () => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    try {
      await axios.delete(`${API_BASE_URL}/notice/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      alert('정상적으로 삭제되었습니다.');
      navigate('/notice');
    } catch (error) {
      console.error('공지사항 삭제 실패: ', error);
      alert('삭제에 실패했습니다. 관리자에게 문의하세요.');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  // 파일 업로드 핸들러, 파일을 여러개 업로드 가능
  const handleFileChange = (selectedFiles) => {
    setFiles(prevFiles => [...prevFiles, ...Array.from(selectedFiles)]);
  };

  const currentIndex = noticeList.content ? noticeList.content.findIndex(item => item.noticeId === parseInt(id)) : -1;
  const previousNoticeId = currentIndex > 0 ? noticeList.content[currentIndex - 1]?.noticeId : null;
  const nextNoticeId = currentIndex < noticeList.content.length - 1 ? noticeList.content[currentIndex + 1]?.noticeId : null;
  return (
    <section className="member-list">
      <Box display="flex" flexDirection="column" alignItems="center" p={2} maxWidth='1135px' minWidth='1135px'>
        <Paper elevation={3} sx={{ mt: -2, minHeight: '600px', width: '100%', p: 4, borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6" fontFamily="Pretendard" sx={{ mb: 3, height: '50px', borderBottom: 'solid 1.5px #eaeaea' }}>{notice.title}</Typography>

            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box display="flex" alignItems="center">
                <Avatar alt="작성자" src={notice.profileImg ? `https://kr.object.ncloudstorage.com/dataink/${notice.profileImg}` : '/icons/dataink-logo_icon.svg'} sx={{ width: 40, height: 40, mr: 2, mb: 3 }} />
                <Box>
                  <Typography variant="body1" fontFamily="Pretendard">{notice.name}</Typography>
                  <Typography variant="body2" fontFamily="Pretendard" color="textSecondary" sx={{ mb: 3 }}>{new Date(notice.created).toLocaleString()}</Typography>
                </Box>
              </Box>

              <Box>
                {userId === notice.userId && (
                  <>
                    {isEditing ? (
                      <>
                        <Button variant="outlined" onClick={handleEdit} sx={{ padding: '0px', borderColor: 'transparent', fontFamily: 'Pretendard', color: '#7c97fe' }}>
                          등록
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditClick} sx={{ padding: '0px', borderColor: 'transparent', fontFamily: 'Pretendard', color: '#7c97fe' }}>
                          수정
                        </Button>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete} sx={{ padding: '0px', borderColor: 'transparent', fontFamily: 'Pretendard', color: '#7c97fe' }}>
                          삭제
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>

            <Box sx={{ minHeight: '300px', mt: 2 }}>
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
                <Typography variant="body1" fontFamily="Pretendard" sx={{ color: "#3e3e3e" }}>
                  {notice.content}
                </Typography>
              )}
            </Box>

            {/* 수정 모드일 때 파일 업로드 컴포넌트 */}
            {isEditing && <InputFileUpload onFileChange={handleFileChange} />}

            {isEditing === true && 
              <List sx={{ mt: 2 }}>
                {notice.noticeFileDtoList && notice.noticeFileDtoList.map((file, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {file.fileType.startsWith('image/') ? (
                        <ImageIcon />
                      ) : (
                        <InsertDriveFileIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={file.fileName}
                      secondary={file.fileSize ? (file.fileSize > 1024 ? `${(file.fileSize / 1024).toFixed(1)} KB` : `${file.fileSize} B`) : '0 KB'}
                    />
                  </ListItem>
                ))}
              </List>
            }

            {isEditing === false &&
                /* 파일 미리보기 */
                <List sx={{ mt: 2 }}>
                  {notice.noticeFileDtoList && notice.noticeFileDtoList.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {file.fileType.startsWith('image/') ? (
                          <ImageIcon />
                        ) : (
                          <InsertDriveFileIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={file.fileName}
                        secondary={file.fileSize ? (file.fileSize > 1024 ? `${(file.fileSize / 1024).toFixed(1)} KB` : `${file.fileSize} B`) : '0 KB'}
                      />
                    </ListItem>
                  ))}
                </List>
            }

          </Box>
        </Paper>

        <Box display="flex" justifyContent="center" mt={2} maxWidth="800px" width="100%">
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              mr: 2,
              fontFamily: 'Pretendard',
              color: previousNoticeId ? "#7C97FE" : "#ddd",
              cursor: previousNoticeId ? "pointer" : "default"
            }}
            onClick={previousNoticeId ? () => navigate(`/notice/${previousNoticeId}`) : null}
            disabled={!previousNoticeId}
          >
            이전글
          </Button>
          <Button
            endIcon={<ArrowForwardIcon />}
            sx={{
              ml: 2,
              fontFamily: 'Pretendard',
              color: nextNoticeId ? "#7C97FE" : "#ddd",
              cursor: nextNoticeId ? "pointer" : "default"
            }}
            onClick={nextNoticeId ? () => navigate(`/notice/${nextNoticeId}`) : null}
            disabled={!nextNoticeId}
          >
            다음글
          </Button>
        </Box>
      </Box>
    </section>
  );
};

export default Notice_detail;
