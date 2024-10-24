import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoDispatch } from './TodoContext';
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
  margin-left: 20px;
  ::placeholder {
    color: #AAAAAA;
  }
`;

function TodoCreate({ open, setOpen }) {
  const [value, setValue] = useState('');
  const dispatch = useTodoDispatch();

  const onChange = (e) => setValue(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (value.trim() === '') return;

    const userId = sessionStorage.getItem('USER_ID'); // 사용자 ID를 가져옴
    const newTodo = {
      todoContent: value, // 할 일 내용
      userId: userId, // 사용자 ID 추가
      done: false, // 완료 여부
    };

    try {
      const token = sessionStorage.getItem('ACCESS_TOKEN');
      // 서버에서 새로 생성된 투두의 ID를 받아옴
      const response = await axios.post('http://localhost:9090/TodoList/todoCreate', newTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const createdTodo = {
        ...newTodo,
        id: response.data.id, // 서버에서 반환된 ID 추가
      };

      dispatch({ type: 'CREATE', todo: createdTodo }); // 새로 생성된 투두 추가
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
