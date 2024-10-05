import React from 'react';
import MenuItem from '@mui/material/MenuItem';  // Material-UI v5
import ListItemIcon from '@mui/material/ListItemIcon';  // Material-UI v5
import Typography from '@mui/material/Typography';  // Material-UI v5
import FileCopyIcon from '@mui/icons-material/FileCopy';  // Material-UI v5
import { connect } from 'react-redux';
import { initSubList, setVisibleDialogCopy } from '../../../actions/Actions';

function CopyAction({ handleClick, selectedFiles }) {
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <ListItemIcon>
        <FileCopyIcon />
      </ListItemIcon>
      <Typography variant="inherit">
        Copy
      </Typography>
    </MenuItem>
  );
}

const mapStateToProps = (state) => ({
  selectedFiles: state.selectedFiles
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: () => {
    dispatch(initSubList());
    dispatch(setVisibleDialogCopy(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CopyAction);
