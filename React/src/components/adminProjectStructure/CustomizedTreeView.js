import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { unstable_useTreeItem2 as useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';


import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';

import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import {useNavigate} from "react-router-dom";
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function DotIcon({ color }) {
  return (
      <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
        <svg width={6} height={6}>
          <circle cx={3} cy={3} r={3} fill={color} />
        </svg>
      </Box>
  );
}

DotIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

TransitionComponent.propTypes = {
  in: PropTypes.bool,
};

function CustomLabel({ color, expandable, children, ...other }) {
  const theme = useTheme();
  const colors = {
    blue: (theme.vars || theme).palette.primary.main,
    green: (theme.vars || theme).palette.success.main,
  };

  const iconColor = color ? colors[color] : null;
  return (
      <TreeItem2Label {...other} sx={{ display: 'flex', alignItems: 'center' }}>
        {iconColor && <DotIcon color={iconColor} />}
        <Typography
            className="labelText"
            variant="body2"
            sx={{ color: 'text.primary' }}
        >
          {children}
        </Typography>
      </TreeItem2Label>
  );
}

CustomLabel.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['blue', 'green']),
  expandable: PropTypes.bool,
};

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, onDoubleClick, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const color = item?.color;
  return (
      <TreeItem2Provider itemId={itemId}>
        <TreeItem2Root {...getRootProps(other)}>
          <TreeItem2Content
              {...getContentProps({
                className: clsx('content', {
                  expanded: status.expanded,
                  selected: status.selected,
                  focused: status.focused,
                  disabled: status.disabled,
                }),
                onDoubleClick: () => onDoubleClick(item),
              })}
          >
            {status.expandable && (
                <TreeItem2IconContainer {...getIconContainerProps()}>
                  <TreeItem2Icon status={status} />
                </TreeItem2IconContainer>
            )}

            <CustomLabel {...getLabelProps({ color })} />
          </TreeItem2Content>
          {children && (
              <TransitionComponent
                  {...getGroupTransitionProps({ className: 'groupTransition' })}
              />
          )}
        </TreeItem2Root>
      </TreeItem2Provider>
  );
});

CustomTreeItem.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  label: PropTypes.node,
  onDoubleClick: PropTypes.func.isRequired,
};

export default function CustomizedTreeView({ folderData, setSelectedFolder,setSelectedProject,selectedProject, setFolderData, setFlatFolderData,getSelectedFolderData }) {
  const [open, setOpen] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState('');
  const [newProjectDec, setNewProjectDec] = React.useState('');
  const [newProjectDueDate, setNewProjectDueDate] = React.useState(''); // 마감일자 상태 추가

  const getFolderData= async (folderId,projectId)=>{
    try {
      const response=await axios.get(`${API_BASE_URL}/projects/folder`, {
        params:{
          selectedFolder:folderId,
          selectedProject:projectId
        },
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
        }
      });
      if (response.status === 200) {

      }
    }
    catch (e){

    }
  }
  const handleFolderDoubleClick = (folder) => {
    if(folder.isFolder){
      setSelectedProject(folder.projectId);
      setSelectedFolder(folder.id);
    }
    else{
      
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewProject = async (e) => {
    e.preventDefault();
    const sendFolder = {
      projectId:null,
      userId:null,
      name: newProjectName,
      description: newProjectDec,
      startDate: null, // LocalDateTime과 호환되도록 수정
      endDate: `${newProjectDueDate}T00:00:00`, // LocalDateTime에 맞게 수정
      mongoDataId:null,
      folders:[]
    };
    try {
      const response = await axios.post(`${API_BASE_URL}/projects/create`, sendFolder,{
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if (response.status === 201) {
        // 성공적으로 데이터를 생성하면 로컬 상태 업데이트, 이때 프로젝트 정보로 프로젝트 루트 폴더를 하나 생성함, 이 폴더는 프론트 폴더 구조를 따름
        const newFolder={
          id:response.data.projectId,
          label:response.data.name,
          children:[],
          itemId:null,
          lastModifiedUserId:response.data.userId,
          lastModifiedDate:response.data.startDate,
          isFolder:true,
          parentId:null,
          finished:false,
          workStatus:"",
          projectId:response.data.projectId
        }
        setFlatFolderData((prevData) => [...prevData, newFolder]);
        setOpen(false); // 모달 닫기
      } else {
        console.error('프로젝트 생성 실패: ', response.status);
      }
    } catch (error) {
      console.error('서버 요청 오류: ', error);
    }
    setOpen(false);
  };
  const navi=useNavigate();
  return (
      <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button variant="contained" sx={{ ml: 'auto' }} onClick={handleOpen}>
                새 프로젝트
              </Button>

          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="contained" sx={{ ml: 'auto' }} onClick={()=>navi("/item_structure/0")}>
              새 항목 만들기
            </Button>
          </Box>

          <RichTreeView
              items={folderData}
              aria-label="pages"
              multiSelect
              sx={{
                m: '0 -8px',
                pb: '8px',
                height: 'fit-content',
                flexGrow: 1,
                overflowY: 'auto',
              }}
              slots={{
                item: (props) => (
                    <CustomTreeItem
                        {...props}
                        onDoubleClick={handleFolderDoubleClick}
                    />
                ),
              }}
          />
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>새 프로젝트 생성</DialogTitle>
            <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  label="프로젝트 이름"
                  type="text"
                  fullWidth
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  variant="outlined"
              />
              <TextField
                
                  margin="dense"
                  label="프로젝트 설명"
                  multiline
                  rows={5}
                  fullWidth
                  value={newProjectDec}
                  onChange={(e) => setNewProjectDec(e.target.value)}
                  variant="outlined"
              />
              <TextField
                  margin="dense"
                  label="마감일자"
                  type="date"
                  fullWidth
                  value={newProjectDueDate}
                  onChange={(e) => setNewProjectDueDate(e.target.value)} // 마감일자 입력 필드 추가
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={createNewProject} variant="contained">
                생성
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
  );
}
