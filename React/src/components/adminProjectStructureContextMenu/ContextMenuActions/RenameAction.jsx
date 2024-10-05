import React from 'react';
import MenuItem from '@mui/material/MenuItem';  // Material-UI v5
import ListItemIcon from '@mui/material/ListItemIcon';  // Material-UI v5
import Typography from '@mui/material/Typography';  // Material-UI v5
import WrapTextIcon from '@mui/icons-material/WrapText';  // Material-UI v5
import { connect } from 'react-redux';
import { setVisibleDialogRename } from '../../../actions/Actions.js';

function RenameAction({ handleClick, selectedFiles }) {
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <ListItemIcon>
        <WrapTextIcon />
      </ListItemIcon>
      <Typography variant="inherit">
        Rename
      </Typography>
    </MenuItem>
  );
}

const mapStateToProps = (state) => ({
  selectedFiles: state.selectedFiles,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: () => {
    dispatch(setVisibleDialogRename(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RenameAction);
