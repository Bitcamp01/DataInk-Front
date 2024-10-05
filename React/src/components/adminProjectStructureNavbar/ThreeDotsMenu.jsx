import React, { useState } from 'react';
import Menu from '@mui/material/Menu';  // Material-UI v5
import IconButton from '@mui/material/IconButton';  // Material-UI v5
import MoreVertIcon from '@mui/icons-material/MoreVert';  // Material-UI v5
import { connect } from 'react-redux';
import CreateFolderAction from '../adminProjectStructureContextMenu/ContextMenuActions/CreateFolderAction.jsx';
import UploadFileAction from '../adminProjectStructureContextMenu/ContextMenuActions/UploadFileAction.jsx';

function ThreeDotsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ marginLeft: '1em' }}>
      <IconButton
        color="inherit"
        aria-label="More"
        aria-controls={open ? 'long-menu' : undefined}  // aria-owns -> aria-controls로 변경
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <CreateFolderAction handleClose={handleClose} />
        <UploadFileAction handleClose={handleClose} />
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreeDotsMenu);
