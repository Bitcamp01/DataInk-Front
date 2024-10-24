import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from './TodoContext';
import axios from 'axios';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  visibility: hidden;
  margin-right: 30px;
  &:hover {
    color: #FD5B5B;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;

  &:hover {
    ${Remove} {
      visibility: visible;
    }
  }
`;

const Checkbox = styled.div`
  width: 14px;
  height: 14px;
  border: 1px solid #C1C1C1;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  ${props => 
    props.done && 
    css`
      background: #7C97FE;
      color: white;
    `}
`;

const Text = styled.div`
  font-size: 14px;
  color: #495057;

  ${props =>
    props.done && 
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();

  const onToggle = () => dispatch({ type: 'TOGGLE', id });

  const onRemove = async () => {
    try {
      const token = sessionStorage.getItem('ACCESS_TOKEN');
      await axios.delete(`http://localhost:9090/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: 'REMOVE', id });
    } catch (error) {
      console.error('Todo를 삭제하는 중 에러가 발생했습니다:', error);
    }
  };

  return (
    <TodoItemBlock>
      <Checkbox done={done} onClick={onToggle}>
        {done && <MdDone />}
      </Checkbox>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
