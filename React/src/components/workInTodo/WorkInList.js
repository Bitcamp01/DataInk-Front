import React from 'react';
import styled from 'styled-components';
import WorkItem from './WorkItem';
import { useTodoState } from './TodoContext';

const WorkInListBlock = styled.div`
  padding-left: 20px;
  padding-bottom: 20px;
  flex: 1;
  overflow-y: auto; // 스크롤이 생기도록 설정

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

function WorkInList() {
  const todos = useTodoState();

  return (
    <>
      <WorkInListBlock>
        <WorkItem text="프로젝트1"/>
        <WorkItem text="프로젝트2"/>
        <WorkItem text="프로젝트3"/>
        <WorkItem text="프로젝트4"/>
        <WorkItem text="프로젝트5"/>
        <WorkItem text="프로젝트6"/>

      </WorkInListBlock>
    </>
  );
}

export default WorkInList;

