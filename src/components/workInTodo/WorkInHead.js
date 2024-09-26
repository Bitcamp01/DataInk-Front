// 오늘의 날짜와 요일을 보여주고, 
// 앞으로 해야할 일들이 몇개 남았는지 보여주는 컴포넌트입니다.

import React from 'react';
import styled from 'styled-components';
import {useTodoState} from './TodoContext';

const WorkInBlcok = styled.div`
    padding-left: 32px;
    padding-right: 32px;
    border-bottom: 1px solid #e9exef;

    h3 {
        padding: 0;
        color: #2F2F2F;
        padding-bottom: 10px;
        border-bottom: 1px solid #DFDFDF;
        margin-bottom: 10px;
    }
`

function WorkInHead() {
    const todos = useTodoState();

    return (
      <>
          <WorkInBlcok>
              <h3>Work In</h3>
          </WorkInBlcok>
      </>
    );
  }

export default WorkInHead;