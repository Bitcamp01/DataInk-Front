import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';  // Material-UI v5
import TextField from '@mui/material/TextField';  // Material-UI v5
import Dialog from '@mui/material/Dialog';  // Material-UI v5
import DialogActions from '@mui/material/DialogActions';  // Material-UI v5
import DialogContent from '@mui/material/DialogContent';  // Material-UI v5
import DialogTitle from '@mui/material/DialogTitle';  // Material-UI v5
import { connect } from 'react-redux';
import { renameItem, setVisibleDialogRename } from '../../../actions/Actions.js';

function FormDialog({ realName, open, handleClose, handleSave }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(realName);
  }, [realName]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSaveClick = (event) => {
    handleSave(event, realName, value);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-create-folder" fullWidth maxWidth="sm">
      <form>
        <DialogTitle id="form-dialog-create-folder">Rename</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Item name"
            type="text"
            onChange={handleChange}
            value={value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit" onClick={handleSaveClick}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  open: state.visibleDialogRename,
  realName: state.selectedFiles.length ? state.selectedFiles[0].name : ''
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => {
    dispatch(setVisibleDialogRename(false));
  },
  handleSave: (event, realName, newName) => {
    event.preventDefault();
    dispatch(renameItem(realName, newName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
