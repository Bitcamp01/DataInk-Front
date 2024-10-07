import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';  // Material-UI v5
import Dialog from '@mui/material/Dialog';  // Material-UI v5
import DialogActions from '@mui/material/DialogActions';  // Material-UI v5
import DialogContent from '@mui/material/DialogContent';  // Material-UI v5
import DialogContentText from '@mui/material/DialogContentText';  // Material-UI v5
import DialogTitle from '@mui/material/DialogTitle';  // Material-UI v5
import { connect } from 'react-redux';
import { setVisibleDialogEdit } from '../../../../actions/Actions.js';

function FormDialog({ open, blobUrl, handleClose, handleSave }) {
  const [lastBlobUrl, setLastBlobUrl] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blobUrl !== lastBlobUrl) {
      setLastBlobUrl(blobUrl);
      setLoading(true);

      if (blobUrl) {
        fetch(blobUrl)
          .then((r) => r.text())
          .then((t) => {
            setContent(t);
            setLoading(false);
          });
      }
    }
  }, [blobUrl, lastBlobUrl]);

  const textAreaStyle = {
    width: '100%',
    minHeight: '300px',
  };

  const textArea = <textarea style={textAreaStyle} defaultValue={content || ''} />;

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-edit" fullWidth maxWidth="sm">
      <DialogTitle id="form-dialog-edit">Editing file</DialogTitle>
      <DialogContent>
        <DialogContentText>{loading ? 'Loading...' : textArea}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button color="primary" onClick={handleSave}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  open: state.visibleDialogEdit,
  blobUrl: state.fileContentBlobUrl,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => {
    dispatch(setVisibleDialogEdit(false));
  },
  handleSave: (event) => {
    // handle save logic here
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
