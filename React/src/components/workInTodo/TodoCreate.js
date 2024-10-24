import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoNextId } from './TodoContext';
import axios from 'axios';

// 입력 폼을 감싸는 위치 설정
const InputFormWrapper = styled.div`
  margin-top: 20px;
`;

// 입력 폼 스타일
const InputForm = styled.form`
  display: flex;
  align-items: center;
`;

// 할 일 입력 인풋 스타일
const Input = styled.input`
  flex: 1;
  font-size: 14px;
  border: none;
  outline: none;
  color: #2F2F2F;
  ::placeholder {
    color: #AAAAAA;
  }
`;

function TodoCreate({ open, setOpen }) {
  const [value, setValue] = useState('');
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onChange = (e) => setValue(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (value.trim() === '') return;

    const newTodo = {
      id: nextId.current,
      text: value,
      done: false,
    };

    try {
      const token = sessionStorage.getItem('ACCESS_TOKEN');
      await axios.post('http://localhost:9090/TodoList', newTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      dispatch({ type: 'CREATE', todo: newTodo });
      nextId.current += 1;
      setValue(''); // 입력값 초기화
      setOpen(false); // 입력 폼 닫기
    } catch (error) {
      console.error('Todo를 생성하는 중 에러가 발생했습니다:', error);
    }
  };

  return (
    <>
      {open && (
        <InputFormWrapper>
          <InputForm onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="할 일을 입력해주세요."
              value={value}
              onChange={onChange}
            />
          </InputForm>
        </InputFormWrapper>
      )}
    </>
  );
}

export default TodoCreate;
