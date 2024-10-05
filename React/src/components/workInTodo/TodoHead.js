import React, { useState } from 'react';
import styled from 'styled-components';
import { MdAdd, MdRemove } from 'react-icons/md'; // - 아이콘 추가
import { useTodoState } from './TodoContext';
import TodoCreate from './TodoCreate';

const TodoHeadBlock = styled.div`
  padding-left: 5px;
  padding-right: 32px;
  border-bottom: 1px solid #e9exef;
  display: flex;
  align-items: center;

  h3 {
    margin: 0;
    color: #2F2F2F;
    padding-bottom: 10px;
    border-bottom: 1px solid #DFDFDF;
    width: 466px; // 변경: 자동 너비로 설정
  }
`;

const AddButton = styled.button`
  background: #7C97FE;
  cursor: pointer;
  width: 25px;  
  height: 20px; 
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  border-radius: 3px;
  border: none;
  color: white;
`;

const StyledMdAdd = styled(MdAdd)`
  font-size: 15px; 
  position: absolute; 
`;

const StyledMdRemove = styled(MdRemove)` // - 아이콘 스타일
  font-size: 15px; 
  position: absolute; 
`;

function TodoHead() {
  const todos = useTodoState();
  const [open, setOpen] = useState(false); // 입력 폼 열고 닫기 위한 상태

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <TodoHeadBlock>
        <h3>To-do</h3>
        <AddButton type="button" onClick={toggleOpen}>
          {open ? <StyledMdRemove /> : <StyledMdAdd />} {/* 조건부 렌더링 */}
        </AddButton>
      </TodoHeadBlock>
      <TodoCreate open={open} setOpen={setOpen} /> {/* 입력 필드 렌더링 */}
    </>
  );
}

export default TodoHead;
