import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';  // Material-UI v5
import UploadFileList from './UploadFileList';

function FileUploader({ fileUploadList, handleSelectedFiles, handleReset }) {
  const inputRef = useRef(null);

  const handleClear = (event) => {
    inputRef.current.value = '';  // input 값을 초기화
    handleReset(event);
  };

  const styles = {
    inputfile: {
      display: 'none',
    },
    inputreset: {
      display: fileUploadList.length ? 'inline-flex' : 'none',
    },
  };

  return (
    <div>
      <label htmlFor="button-file">
        <input
          style={styles.inputfile}
          id="button-file"
          ref={inputRef}
          multiple
          type="file"
          onChange={handleSelectedFiles}
        />
        <Button component="span" variant="contained" color="primary">
          Select Files
        </Button>
      </label>

      <Button
        style={styles.inputreset}
        component="span"
        type="reset"
        onClick={handleClear}
      >
        Clear
      </Button>

      <UploadFileList files={fileUploadList} />
    </div>
  );
}

FileUploader.propTypes = {
  fileUploadList: PropTypes.array.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSelectedFiles: PropTypes.func.isRequired,
};

export default FileUploader;
