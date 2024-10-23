import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const InputFileUpload = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    onFileChange(event.target.files); // 파일 선택 시 부모 컴포넌트로 전달
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      sx={{
        backgroundColor:"#C6C6C6"
       }}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileChange}
        multiple
      />
    </Button>
  );
};

export default InputFileUpload;
