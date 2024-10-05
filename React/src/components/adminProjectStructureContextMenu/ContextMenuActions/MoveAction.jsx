import React from 'react';
import MenuItem from '@mui/material/MenuItem';  // Material-UI v5
import ListItemIcon from '@mui/material/ListItemIcon';  // Material-UI v5
import Typography from '@mui/material/Typography';  // Material-UI v5
import HowToVoteIcon from '@mui/icons-material/HowToVote';  // Material-UI v5
import { connect } from 'react-redux';
import { initSubList, setVisibleDialogMove } from '../../../actions/Actions.js';

function MoveAction({ handleClick, selectedFiles }) {
  return (
    <MenuItem onClick={(e) => handleClick(e, selectedFiles)}>
      <ListItemIcon>
        <HowToVoteIcon />
      </ListItemIcon>
      <Typography variant="inherit">
        Move
      </Typography>
    </MenuItem>
  );
}

const mapStateToProps = (state) => ({
  selectedFiles: state.selectedFiles,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: () => {
    dispatch(initSubList());
    dispatch(setVisibleDialogMove(true));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoveAction);
