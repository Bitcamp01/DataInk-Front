// TodoItem.js
import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import {useTodoDispatch} from './TodoContext';


const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    visibility: hidden; /* 기본적으로 숨김 */
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
            visibility: visible; /* 호버 시 아이콘 보이게 함 */
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

function TodoItem ({ id, done, text }) {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({type: 'TOGGLE', id});
    const onRemove = () => dispatch({type: 'REMOVE', id});

    return (
        <TodoItemBlock>
            <Checkbox done={done} onClick={onToggle}>{done && <MdDone />}</Checkbox>
            <TextWrapper>
                <Text done={done}>{text}</Text>
            </TextWrapper>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
};

export default TodoItem;
