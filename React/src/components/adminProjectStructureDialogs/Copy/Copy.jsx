import React from 'react';
import Button from '@mui/material/Button';  // Material-UI v5
import Dialog from '@mui/material/Dialog';  // Material-UI v5
import DialogActions from '@mui/material/DialogActions';  // Material-UI v5
import DialogContent from '@mui/material/DialogContent';  // Material-UI v5
import DialogTitle from '@mui/material/DialogTitle';  // Material-UI v5
import { connect } from 'react-redux';
import { setVisibleDialogCopy, setSelectedFolderSublist, enterToPreviousDirectorySublist, copyItems } from '../../../actions/Actions.js';
import FileListSublist from '../../adminProjectStructureFileList/FileListSublist/FileListSublist.jsx'; 
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';  // Material-UI v5

function FormDialog({
  selectedPath, handleClose, handleSave, open, 
  canGoBack, canCopy, selectedFiles, handleGoBack
}) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-copy" fullWidth maxWidth="sm">
      <form>
        <DialogTitle id="form-dialog-copy">
          Copy files to <small style={{ color: 'grey' }}>{selectedPath.join('/')}</small>
        </DialogTitle>
        <DialogContent>
          <FileListSublist />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoBack} color="primary" disabled={!canGoBack} type="button">
            <KeyboardArrowLeftIcon /> Go back directory
          </Button>

          <Button onClick={handleClose} color="primary" type="button">
            Cancel
          </Button>
          <Button color="primary" onClick={(e) => handleSave(e, selectedFiles)} disabled={!canCopy} type="submit">
            Copy
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  const canCopy = state.path.join('') !== state.pathSublist.join('') + (state.selectedFolderSublist ? state.selectedFolderSublist.name : '');

  return {
    open: state.visibleDialogCopy,
    selectedFolderSublist: state.selectedFolderSublist,
    selectedPath: state.selectedFolderSublist ? [...state.pathSublist, state.selectedFolderSublist.name] : [],
    canGoBack: state.pathSublist.length,
    canCopy: state.selectedFolderSublist && canCopy,
    selectedFiles: state.selectedFiles
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => {
    dispatch(setSelectedFolderSublist(null));
    dispatch(setVisibleDialogCopy(false));
  },
  handleSave: (event, selectedFiles) => {
    dispatch(copyItems(selectedFiles));
  },
  handleGoBack: () => {
    dispatch(setSelectedFolderSublist(null));
    dispatch(enterToPreviousDirectorySublist());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
