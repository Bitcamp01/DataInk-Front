import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  CircularProgress,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // 체크 아이콘 가져오기

export default function ItemSettingsModal({ open, onClose, onSave, items, selectedItem,setSelectedItem }) {
  const [displayItems, setDisplayItems] = useState(items.slice(0, 20)); // 처음 20개 항목만 로드

  // 무한 스크롤 핸들러
  const loadMoreItems = () => {
    const nextItems = items.slice(displayItems.length, displayItems.length + 20);
    setDisplayItems((prev) => [...prev, ...nextItems]);
  };

  // 모달이 열릴 때마다 최신 데이터를 displayItems로 초기화
  React.useEffect(() => {
    if (open) {
      setDisplayItems(items.slice(0, 20));
    }
  }, [open, items]);

  // 항목 선택 핸들러
  const handleSelectItem = (item) => {
    setSelectedItem(item.id); // 선택된 항목의 ID만 저장
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>항목 선택</DialogTitle>
      <DialogContent>
        <InfiniteScroll
          dataLength={displayItems.length}
          next={loadMoreItems}
          hasMore={displayItems.length < items.length}
          loader={<CircularProgress />}
          height={400}
        >
          <List>
            {displayItems.map((item) => (
              <ListItem
                
                key={item.id}
                button
                onClick={() => handleSelectItem(item)}
                selected={item.selected}
              >
                <ListItemText primary={item.label} />
                {item.id === selectedItem && (
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                )}

              </ListItem>
            ))}
          </List>
        </InfiniteScroll>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={onSave} variant="contained">
          저장
        </Button>
        <Button onClick={onSave} variant="contained">
          새로운 항목 생성
        </Button>
      </DialogActions>
    </Dialog>
  );
}
