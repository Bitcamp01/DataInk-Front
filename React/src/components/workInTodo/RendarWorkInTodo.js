import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './TodoTemplate';
import { TodoProvider } from './TodoContext';
import TodoCreate from './TodoCreate';

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function RenderWorkInTodo() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default RenderWorkInTodo;
