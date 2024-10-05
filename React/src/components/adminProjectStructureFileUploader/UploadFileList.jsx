import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';  // Material-UI v5
import ListItem from '@mui/material/ListItem';  // Material-UI v5
import ListItemIcon from '@mui/material/ListItemIcon';  // Material-UI v5
import ListItemText from '@mui/material/ListItemText';  // Material-UI v5
import FileIcon from '@mui/icons-material/InsertDriveFile';  // Material-UI v5
import { getHumanFileSize } from '../../api/ApiHandler';

function UploadFileList(props) {
  const { files } = props;
  const list = files.map((f, i) => (
    <ListItem dense key={i}>
      <ListItemIcon>
        <FileIcon />
      </ListItemIcon>
      <ListItemText primary={`${f.name} (${getHumanFileSize(f.size)})`} />
    </ListItem>
  ));

  return (
    <div>
      <List component="nav">
        {list}
      </List>
    </div>
  );
}

UploadFileList.propTypes = {
  files: PropTypes.array.isRequired,
};

export default UploadFileList;
