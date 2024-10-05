import React from 'react';
import MenuItem from '@mui/material/MenuItem';  // Material-UI v5
import ListItemIcon from '@mui/material/ListItemIcon';  // Material-UI v5
import Typography from '@mui/material/Typography';  // Material-UI v5
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';  // Material-UI v5
import { connect } from 'react-redux';
import { setVisibleDialogCreateFolder } from '../../../actions/Actions.js';

function CreateFolderAction({ handleClick, handleClose }) {
  const handleCloseAfter = (callback) => (event) => {
    callback();
    handleClose();
  };

  return (
    <MenuItem onClick={handleCloseAfter(handleClick)}>
      <ListItemIcon>
        <CreateNewFolderIcon />
      </ListItemIcon>
      <Typography variant="inherit">
        Create folder
      </Typography>
    </MenuItem>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: () => {
    dispatch(setVisibleDialogCreateFolder(true));
  }
});

export default connect(null, mapDispatchToProps)(CreateFolderAction);
