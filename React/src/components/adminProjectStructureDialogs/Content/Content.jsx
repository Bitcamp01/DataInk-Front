import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';  // Material-UI v5
import Dialog from '@mui/material/Dialog';  // Material-UI v5
import DialogActions from '@mui/material/DialogActions';  // Material-UI v5
import DialogContent from '@mui/material/DialogContent';  // Material-UI v5
import DialogTitle from '@mui/material/DialogTitle';  // Material-UI v5
import { connect } from 'react-redux';
import { setVisibleDialogContent } from '../../../actions/Actions.js';

function FormDialog({ handleClose, open, blobUrl }) {
  const [lastBlobUrl, setLastBlobUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blobUrl !== lastBlobUrl) {
      setLastBlobUrl(blobUrl);
      setLoading(true);
    }
  }, [blobUrl, lastBlobUrl]);

  return (
    <div style={{ marginLeft: '1em' }}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-content" fullWidth maxWidth="sm">
        <DialogTitle id="form-dialog-content">Viewing file</DialogTitle>
        <DialogContent>
          <img src={blobUrl} alt="" style={{ maxWidth: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  open: state.visibleDialogContent,
  blobUrl: state.fileContentBlobUrl,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => {
    dispatch(setVisibleDialogContent(false));
  },
  handleOpen: () => {
    dispatch(setVisibleDialogContent(true));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
