import React from 'react';
import MenuItem from '@mui/material/MenuItem';  // Material-UI v5
import ListItemIcon from '@mui/material/ListItemIcon';  // Material-UI v5
import Typography from '@mui/material/Typography';  // Material-UI v5
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';  // Material-UI v5
import { connect } from 'react-redux';
import { getFileContentForEdit } from '../../../../actions/Actions.js';

function OpenAction({ handleClick, selectedFiles }) {
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <ListItemIcon>
        <OpenInBrowserIcon />
      </ListItemIcon>
      <Typography variant="inherit">
        Edit
      </Typography>
    </MenuItem>
  );
}

const mapStateToProps = (state) => ({
  selectedFiles: state.selectedFiles,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: (event, selectedFiles) => {
    dispatch(getFileContentForEdit(selectedFiles[0].name));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenAction);
