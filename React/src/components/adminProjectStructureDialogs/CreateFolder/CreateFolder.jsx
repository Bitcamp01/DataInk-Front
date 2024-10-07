import React from 'react';
import Button from '@mui/material/Button';  // Material-UI v5
import TextField from '@mui/material/TextField';  // Material-UI v5
import Dialog from '@mui/material/Dialog';  // Material-UI v5
import DialogActions from '@mui/material/DialogActions';  // Material-UI v5
import DialogContent from '@mui/material/DialogContent';  // Material-UI v5
import DialogTitle from '@mui/material/DialogTitle';  // Material-UI v5
import { connect } from 'react-redux';
import { createNewFolder, setVisibleDialogCreateFolder } from '../../../actions/Actions.js';

function FormDialog({ handleClose, handleSave, open, value }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-create-folder" fullWidth maxWidth="sm">
      <form>
        <DialogTitle id="form-dialog-create-folder">Project create</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="project name"
            type="text"
            defaultValue={value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  value: state.createFolderName,
  open: state.visibleDialogCreateFolder,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => {
    dispatch(setVisibleDialogCreateFolder(false));
  },
  handleSave: (event) => {
    event.preventDefault();
    const folderName = event.currentTarget.form.querySelector('input').value;
    dispatch(createNewFolder(folderName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
