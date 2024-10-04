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
  const { id, itemId, label, disabled, children,onDoubleClick, ...other } = props;

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
            onDoubleClick: () => onDoubleClick(item)
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
  onDoubleClick:PropTypes.func.isRequired
};
//전체 프로젝트 구조,현재 선택된 폴더 정하기,전체 프로젝트 구조 변경(트리뷰 단에서 새로운 프로젝트 생성을 지원, 추후 이름 변경,삭제,복사,붙여넣기,이동,자르기 정도 구현 예정)
export default function CustomizedTreeView({ folderData, onFolderSelect,setFolderData }) {
  //새프로젝트 생성 하는 모달 창 띄우기 위한 상태 관리
  const [open, setOpen] = React.useState(false);
  // 그냥 let으로 사용해도 될 듯?
  const [newProjectName,setNewProjectName]=React.useState("");
  const [newProjectDec,setNewProjectDec]=React.useState("");

  // 트리뷰에서 더블 클릭시 데이터 그리드에 해당 폴더 내용이 띄워지게 하기 위한 핸들러
  const handleFolderDoubleClick = (folder) => {
    console.log(folder)

    onFolderSelect(folder);
  };
  // 모달 열기
  const handleOpen = () => {
    setOpen(true);
  };

  // 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };

  // 새 프로젝트 생성 핸들러
  const createNewProject = (e) => {
    // 백엔드에 요청을 보내고
    const response="ok"
    // 요청이 성공 했을 때 클라이언트 단에서 보관하고 있는 데이터를 수정
    // 응답에 새로 생성되는 요소의 아이디 값은 가져와야 할 듯
    if(response == "ok" ){
      setFolderData(prevData => [
        ...prevData, // 기존 데이터 복사
        {
          id: "responseId", // 백엔드 응답에서 가져오는 id 값
          label: newProjectName,
          isFolder: true,
          children: [],
          files: []
        }
      ]);
    }
    setOpen(false); // 모달 닫기
  };
  
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography component="h2" variant="subtitle2">
            Product tree
          </Typography>
          <Button variant="contained" sx={{ ml: 'auto' }} onClick={handleOpen}>
            새 프로젝트
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
                onDoubleClick={handleFolderDoubleClick} // 더블 클릭 이벤트 핸들러 연결
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
              autoFocus
              margin="dense"
              label="프로젝트 설명"
              multiline
              rows={5}
              fullWidth
              value={newProjectDec}
              onChange={(e) => setNewProjectDec(e.target.value)}
              variant="outlined"
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
