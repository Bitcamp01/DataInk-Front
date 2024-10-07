import React from 'react';
import Button from '@mui/material/Button';  // Material-UI v5
import Dialog from '@mui/material/Dialog';  // Material-UI v5
import DialogActions from '@mui/material/DialogActions';  // Material-UI v5
import DialogContent from '@mui/material/DialogContent';  // Material-UI v5
import DialogTitle from '@mui/material/DialogTitle';  // Material-UI v5
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';  // Material-UI v5
import { connect } from 'react-redux';
import { setVisibleDialogMove, setSelectedFolderSublist, enterToPreviousDirectorySublist, moveItems } from '../../../../actions/Actions.js';
import FileListSublist from '../../adminProjectStructureFileList/FileListSublist/FileListSublist.jsx';

function FormDialog({
  selectedPath, handleClose, handleSave, open, 
  selectedFiles, canGoBack, canMove, handleGoBack
}) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-move" fullWidth maxWidth="sm">
      <form>
        <DialogTitle id="form-dialog-move">
          Move files to <small style={{ color: 'grey' }}>{selectedPath.join('/')}</small>
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
          <Button color="primary" onClick={(e) => handleSave(e, selectedFiles)} disabled={!canMove} type="submit">
            Move
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  const canMove = state.path.join('') !== state.pathSublist.join('') + (state.selectedFolderSublist ? state.selectedFolderSublist.name : '');

  return {
    open: state.visibleDialogMove,
    selectedFolderSublist: state.selectedFolderSublist,
    selectedPath: state.selectedFolderSublist ? [...state.pathSublist, state.selectedFolderSublist.name] : [],
    selectedFiles: state.selectedFiles,
    pathSublist: state.pathSublist,
    canGoBack: state.pathSublist.length,
    canMove: state.selectedFolderSublist && canMove,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => {
    dispatch(setSelectedFolderSublist(null));
    dispatch(setVisibleDialogMove(false));
  },
  handleSave: (event, selectedFiles) => {
    dispatch(moveItems(selectedFiles));
  },
  handleGoBack: () => {
    dispatch(setSelectedFolderSublist(null));
    dispatch(enterToPreviousDirectorySublist());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
