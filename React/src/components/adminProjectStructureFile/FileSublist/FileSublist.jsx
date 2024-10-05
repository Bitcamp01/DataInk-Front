import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';  // PropTypes 임포트 추가
import {
  setSelectedFolderSublist, enterToDirectorySublist
} from '../../../actions/Actions.js';
import ListItem from '@mui/material/ListItem';  // Material-UI v5
import ListItemAvatar from '@mui/material/ListItemAvatar';  // Material-UI v5
import ListItemText from '@mui/material/ListItemText';  // Material-UI v5
import Avatar from '@mui/material/Avatar';  // Material-UI v5
import FolderIcon from '@mui/icons-material/Folder';  // Material-UI v5
import FileIcon from '@mui/icons-material/InsertDriveFile';  // Material-UI v5
import { blue } from '@mui/material/colors';  // Material-UI v5
import { makeStyles } from '@mui/styles';  // withStyles 대신 makeStyles 사용
import '../File.css';

// 스타일 정의
const useStyles = makeStyles((theme) => ({
  avatar: (isSelected) => ({
    backgroundColor: isSelected ? blue['A200'] : null,
  }),
}));

function FileSublist(props) {
  const { type, name, handleClick, isSelected, handleDoubleClick } = props;
  const classes = useStyles(isSelected);

  return (
    <div className="File" onClick={handleClick} data-selected={isSelected} onDoubleClick={handleDoubleClick}>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            {type === 'dir' ? <FolderIcon /> : <FileIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItem>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  filePath: [...state.path, ownProps.name],
  isSelected: state.selectedFolderSublist && (state.selectedFolderSublist.name === ownProps.name),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleDoubleClick: () => {
    dispatch(enterToDirectorySublist(ownProps.name));
    dispatch(setSelectedFolderSublist(null));
  },
  handleClick: (event) => {
    event.stopPropagation();
    dispatch(setSelectedFolderSublist(ownProps));
  },
});

FileSublist.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleDoubleClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileSublist);
