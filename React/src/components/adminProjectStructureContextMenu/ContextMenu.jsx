import React from 'react';
import { connect } from 'react-redux';
import './ContextMenu.css';
import Menu from '@mui/material/Menu';  // Material-UI v5
import { getActionsByMultipleFiles } from '../../api/ApiHandler.js';
import OpenAction from './ContextMenuActions/OpenAction.jsx';
import RemoveAction from './ContextMenuActions/RemoveAction.jsx';
import MoveAction from './ContextMenuActions/MoveAction.jsx';
import CopyAction from './ContextMenuActions/CopyAction.jsx';
import EditAction from './ContextMenuActions/EditAction.jsx';
import RenameAction from './ContextMenuActions/RenameAction.jsx';
import DownloadAction from './ContextMenuActions/DownloadAction.jsx';

function ContextMenu({ acts, visible, x, y }) {
  const actionsComp = acts.map((act, key) => {
    switch (act) {
      case 'open':
        return <OpenAction key={key} />;
      case 'edit':
        return <EditAction key={key} />;
      case 'copy':
        return <CopyAction key={key} />;
      case 'move':
        return <MoveAction key={key} />;
      case 'rename':
        return <RenameAction key={key} />;
      case 'download':
        return <DownloadAction key={key} />;
      case 'remove':
        return <RemoveAction key={key} />;
      default:
        return null;
    }
  });

  return (
    <div> 
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={{ top: y, left: x }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={visible}
        onClose={() => {}}
        sx={{ width: 170 }}
      >
        {actionsComp}
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => ({
  x: state.contextMenuPosition[0] || 0,
  y: state.contextMenuPosition[1] || 0,
  visible: !!state.contextMenuVisible,
  acts: getActionsByMultipleFiles(state.selectedFiles),
});
const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ContextMenu);
