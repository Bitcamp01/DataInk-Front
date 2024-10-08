import React from 'react';
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
      background:
       white;
  }
`;

function TodoList() {
  const todos = useTodoState();

  return (
    <>

      <TodoListBlock>
        {todos.map(todo => (
          <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              done={todo.done}
            />
        ))}
      </TodoListBlock>
    </>
  );
}

export default TodoList;

