// 투두리스트의 레이아웃을 설정하는 컴포넌트입니다. 
// 페이지 중앙에 그림자가 적용된 흰색 박스를 보여줍니다.

import React from 'react'
import styled from 'styled-components';
import TodoHead from './TodoHead';
import TodoList from './TodoList';
import WorkInHead from './WorkInHead';
import WorkInList from './WorkInList';

const WorkInTemplateBlock = styled.div`
    width: 466px;
    height: 177px;
    margin-top: 20px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;

`

const TodoTemplateBlock = styled.div`
    width: 466px;
    height: 177px;
    margin-top: 20px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;

`

const TotalTemplateBlock = styled.div`
    width: 522px;
    height: 425px;
    // max-height: 425px;

    background: white;
    border-radius: 7px;
    border: 1px solid #C4C4C4;

    margin: 0 auto;
    display: flex;
    flex-direction: column;
    
`;

const TodoTemplate = ({children}) => {
  return (
    
    <TotalTemplateBlock>
      <WorkInTemplateBlock>
        <WorkInHead/>
        <WorkInList/>
      </WorkInTemplateBlock>
      <TodoTemplateBlock>
        <TodoHead/>
        <TodoList/>
      </TodoTemplateBlock>
    </TotalTemplateBlock>);
}

export default TodoTemplate;