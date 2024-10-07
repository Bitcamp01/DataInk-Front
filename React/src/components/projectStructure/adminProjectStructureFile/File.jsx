import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    enterToDirectory, setContextMenuVisible, toggleSelectedFile, setContextMenuPosition,
    setSelectedFileFromLastTo, getFileContent, getFileContentForEdit, 
    rightClickOnFile, setSelectedFiles
} from '../../../actions/Actions.js';
import './File.css';

import ListItem from '@mui/material/ListItem';  // Material-UI v5
import ListItemAvatar from '@mui/material/ListItemAvatar';  // Material-UI v5
import ListItemText from '@mui/material/ListItemText';  // Material-UI v5
import Avatar from '@mui/material/Avatar';  // Material-UI v5
import FolderIcon from '@mui/icons-material/Folder';  // Material-UI v5
import FileIcon from '@mui/icons-material/InsertDriveFile';  // Material-UI v5
import { blue } from '@mui/material/colors';  // Material-UI v5
import config from '../../../config.js';
import { getHumanFileSize } from '../../../api/ApiHandler';

function File(props) {
  const { isSelected, type, name, size, handleClick, handleDoubleClick, handleContextMenu } = props;
  const avatarStyle = {
    backgroundColor: isSelected ? blue['A200'] : null
  };
  const realSize = typeof size !== 'undefined' && type !== 'dir' ? getHumanFileSize(size) : null;

  return (
    <div className="File" onClick={handleClick} onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu} data-selected={isSelected}>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={avatarStyle}>
            {type === 'dir' ? <FolderIcon /> : <FileIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText className="filename" primary={name} secondary={realSize} />
      </ListItem>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  filePath: [...state.path, ownProps.name],
  isSelected: !!state.selectedFiles.find(f => f.name === ownProps.name)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleDoubleClick: () => {
    if (ownProps.type === 'file') {
      if (config.isEditableFilePattern.test(ownProps.name) || ownProps.editable) {
        dispatch(getFileContentForEdit(ownProps.name));
      } else if (config.isImageFilePattern.test(ownProps.name)) {
        dispatch(getFileContent(ownProps.name));
      }
      return;
    }
    dispatch(enterToDirectory(ownProps.name));
  },

  handleContextMenu: (event) => {
    event.preventDefault();
    event.stopPropagation();

    const x = event.clientX || (event.touches && event.touches[0].pageX);
    const y = event.clientY || (event.touches && event.touches[0].pageY);

    if (event.shiftKey) {
      dispatch(setSelectedFileFromLastTo(ownProps));
    } else {
      dispatch(rightClickOnFile(ownProps));
    }

    dispatch(setContextMenuVisible(true));
    dispatch(setContextMenuPosition(x, y));
  },

  handleClick: (event) => {
    event.stopPropagation();

    if (event.ctrlKey) {
      dispatch(toggleSelectedFile(ownProps));
    } else if (event.shiftKey) {
      dispatch(setSelectedFileFromLastTo(ownProps));
    } else {
      dispatch(setSelectedFiles([ownProps]));
    }
  }
});

File.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  editable: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.number
  ])
};

export default connect(mapStateToProps, mapDispatchToProps)(File);
