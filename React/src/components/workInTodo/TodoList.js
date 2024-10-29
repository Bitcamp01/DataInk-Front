import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from './TodoContext';

const TodoListBlock = styled.div`
  flex: 1;
  padding-left: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #E7E7E7;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const NoTodosMessage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
`;

function TodoList() {
  const todos = useTodoState();
  const [filteredTodos, setFilteredTodos] = useState(todos); // 상태를 별도로 관리
  // useEffect로 todos가 변경될 때마다 리렌더링
  useEffect(() => {
    setFilteredTodos(todos); // todos 상태가 변경되면 filteredTodos를 업데이트
  }, [todos]);

  return (
    <TodoListBlock>
      {filteredTodos.length === 0 ? (
        <NoTodosMessage>작성된 리스트가 없습니다.</NoTodosMessage>
      ) : (
        filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            done={todo.done}
          />
        ))
      )}
    </TodoListBlock>
  );
}

export default TodoList;
