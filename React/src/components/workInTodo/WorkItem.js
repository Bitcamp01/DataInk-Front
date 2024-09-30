// WorkItem.js
import React from 'react';
import styled, { css } from 'styled-components';

const WorkItemBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    height: 20px;
    margin-bottom: 10px;
`;

const Circle = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    background: #7C97FE;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    margin-right: 20px;
    margin-left: 5px;
`

const Deadline1 = styled.div`
    width: 45px;
    hegiht: 20px;
    background: #FD5B5B;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 15px;
    margin-left: 15px;
    font-size: 12px;
    font-weight: bold;
`

const Deadline2 = styled.div`
    width: 45px;
    hegiht: 20px;
    background: #7C97FE;
    color: white;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 15px;
    margin-left: 15px;
    font-size: 12px;
    font-weight: bold;
`

const TextWrapper = styled.div`
    flex: 1; /* 텍스트 영역이 남은 공간을 차지하도록 */
    display: flex;
`;

const Text = styled.div`
    font-size: 14px;
    color: #495057;
    position: relative;
    display: inline-block;
    
    ${props =>
        props.done && 
        css`
            color: #ced4da;
            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                top: 50%;
                height: 1px;
                width: 100%;
                background-color: #7C97FE;
                z-index: 1;
            }
        `}
`;

const WorkItem = ({text }) => {
    return (
        <WorkItemBlock>
            <Circle></Circle>
            <TextWrapper>
                <Text>{text}</Text>
                <Deadline1>D-2</Deadline1>
                {/* <Deadline2>D-23</Deadline2> */}
            </TextWrapper>
        </WorkItemBlock>
    );
};

export default WorkItem;
