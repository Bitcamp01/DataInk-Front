import React from 'react';
import MenuItem from '@mui/material/MenuItem';  // Material-UI v5
import ListItemIcon from '@mui/material/ListItemIcon';  // Material-UI v5
import Typography from '@mui/material/Typography';  // Material-UI v5
import CloudUploadIcon from '@mui/icons-material/CloudUpload';  // Material-UI v5
import { connect } from 'react-redux';
import { setVisibleDialogUploadFile } from '../../../../actions/Actions.js';

function UploadFileAction({ handleClick, handleClose }) {
  const handleCloseAfter = (callback) => (event) => {
    callback();
    handleClose();
  };

  return (
    <MenuItem onClick={handleCloseAfter(handleClick)}>
      <ListItemIcon>
        <CloudUploadIcon />
      </ListItemIcon>
      <Typography variant="inherit">
        Upload files
      </Typography>
    </MenuItem>
  );
}
const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => ({
  handleClick: () => {
    dispatch(setVisibleDialogUploadFile(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileAction);
