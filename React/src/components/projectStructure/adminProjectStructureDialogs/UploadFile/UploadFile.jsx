import React from 'react';
import Button from '@mui/material/Button';  // Material-UI v5
import Dialog from '@mui/material/Dialog';  // Material-UI v5
import DialogActions from '@mui/material/DialogActions';  // Material-UI v5
import DialogContent from '@mui/material/DialogContent';  // Material-UI v5
import DialogTitle from '@mui/material/DialogTitle';  // Material-UI v5
import LinearProgress from '@mui/material/LinearProgress';  // Material-UI v5
import { connect } from 'react-redux';
import { resetFileUploader, uploadFiles, setFileUploadList } from '../../../../actions/Actions.js';
import FileUploader from '../../adminProjectStructureFileUploader/FileUploader.jsx';

function FormDialog({
  handleClose, handleReset, handleUpload, open, canUpload, fileUploadProgress, fileUploadList, handleSelectedFiles
}) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-upload" fullWidth maxWidth="sm">
      <form>
        <DialogTitle id="form-dialog-upload">Upload files</DialogTitle>
        <DialogContent>
          <FileUploader 
            handleUpload={handleUpload} 
            fileUploadList={fileUploadList} 
            handleSelectedFiles={handleSelectedFiles} 
            handleReset={handleReset}
          />
          {canUpload ? <LinearProgress variant="determinate" value={fileUploadProgress} /> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleUpload} disabled={!canUpload} type="submit">
            Upload
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  open: state.visibleDialogUploadFile,
  canUpload: state.fileUploadList.length > 0,
  fileUploadList: state.fileUploadList,
  fileUploadProgress: state.fileUploadProgress,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => {
    dispatch(resetFileUploader());
  },
  handleUpload: (event) => {
    event.preventDefault();
    const files = event.currentTarget.form.querySelector('input[type=file]').files;
    dispatch(uploadFiles(files));
  },
  handleSelectedFiles: (event) => {
    dispatch(setFileUploadList(
      [...event.target.files].map(f => ({ name: f.name, size: f.size }))
    ));
  },
  handleReset: () => {
    dispatch(setFileUploadList([]));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
