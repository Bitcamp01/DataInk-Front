import React from 'react';
import MenuItem from '@mui/material/MenuItem';  // Material-UI v5
import ListItemIcon from '@mui/material/ListItemIcon';  // Material-UI v5
import Typography from '@mui/material/Typography';  // Material-UI v5
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';  // Material-UI v5
import { connect } from 'react-redux';
import { downloadFile } from '../../../../actions/Actions.js';

function DownloadAction({ handleClick, selectedFiles }) {
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <ListItemIcon>
        <CloudDownloadIcon />
      </ListItemIcon>
      <Typography variant="inherit">
        Download
      </Typography>
    </MenuItem>
  );
}

const mapStateToProps = (state) => ({
  selectedFiles: state.selectedFiles,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: (event, selectedFiles) => {
    dispatch(downloadFile(selectedFiles[0].name));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadAction);
