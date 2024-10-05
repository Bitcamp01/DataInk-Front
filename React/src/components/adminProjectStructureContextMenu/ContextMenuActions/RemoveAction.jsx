import React from 'react';
import MenuItem from '@mui/material/MenuItem';  // Material-UI v5
import ListItemIcon from '@mui/material/ListItemIcon';  // Material-UI v5
import Typography from '@mui/material/Typography';  // Material-UI v5
import DeleteIcon from '@mui/icons-material/Delete';  // Material-UI v5
import { connect } from 'react-redux';
import { removeItems } from '../../../actions/Actions.js';

function RemoveAction({ handleClick, selectedFiles }) {
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <Typography variant="inherit">
        Remove
      </Typography>
    </MenuItem>
  );
}

const mapStateToProps = (state) => ({
  selectedFiles: state.selectedFiles,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: (event, selectedFiles) => {
    dispatch(removeItems(selectedFiles));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAction);
