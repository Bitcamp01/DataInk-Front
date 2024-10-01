import React from 'react';
import {useState} from 'react';
import '../css/memberManagement.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';  
import CloseIcon from '@mui/icons-material/Close'; 


const Modal_addMember = ({ open, handleClose, email, setEmail }) => {
  const [isDisabled, setIsDisabled] = useState(false); // 초기값을 false로 설정
  return (
    <>
      {/* 멤버 추가 모달창 */}
      <Dialog open={open} onClose={handleClose} sx={{ 
        '& .MuiDialog-paper': { 
          width: '500px', 
          backgroundColor: '#F6F6F6', //모달창 배경색상
          maxWidth: 'none' 
        }
    }}>
        <DialogTitle style={{fontWeight: 'bolder', fontFamily:'Pretendard, Noto-sans KR'}}>멤버 추가
        <IconButton
            aria-label="close"
            onClick={handleClose}  // X 버튼을 클릭하면 모달 닫기
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],  // X 버튼 색상
            }}
          >
            <CloseIcon />
          </IconButton>

        </DialogTitle>
        <DialogContent>
        <p style={{ marginBottom: '16px', fontSize: '16px', color: '#545454',  
          fontFamily: 'Pretendard, Noto-sans KR', 
        }}>
            멤버 이메일을 추가하면 새로운 멤버를 초대할 수 있습니다.
          </p>
          <TextField
            autoFocus
            margin="dense"
            placeholder={isDisabled ? "추가할 멤버 이메일을 적어주세요" : ""} 
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isDisabled}  // 텍스트 필드 비활성화 여부
            InputProps={{
              style: { backgroundColor: isDisabled ? '#e0e0e0' : '#ffffff' ,  height: '40px'},  // 비활성화 시 배경색 조정
            }}         
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#D2D2D2', 
                  borderWidth: '1px', // 기본 텍스트필드 스타일 설정 
                },
                '&:hover fieldset': {
                  borderColor: '#D2D2D2',
                  borderWidth: '1px',  // 호버 시  텍스트필드 스타일 설정 
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D2D2D2', 
                  borderWidth: '1px', // 포커스 시  텍스트필드 스타일 설정 
                },
              },
            }}
          />

        </DialogContent> 
          <DialogActions
              sx={{
                justifyContent: 'flex-endr',  // 버튼을 가운데로 정렬 (왼쪽: 'flex-start', 오른쪽: 'flex-end')
                gap: '10px',               
                padding: '0px 26px 15px 8px',  
              }}
              >
          <Button onClick={handleClose} style={{ backgroundColor: '#7C97FE', color: 'white' , width: '100px' ,
          fontFamily: 'Pretendard, Noto-sans KR',  
         }}>초대 하기</Button>   
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Modal_addMember;
       