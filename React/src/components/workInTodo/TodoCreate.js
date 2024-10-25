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
  
    const userId = sessionStorage.getItem('USER_ID');
    const newTodo = {
      todoContent: value,
      userId: userId,
      done: false,
    };
  
    try {
      const token = sessionStorage.getItem('ACCESS_TOKEN');
      const response = await axios.post('http://localhost:9090/TodoList/todoCreate', newTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const createdTodo = {
        ...newTodo,
        id: response.data.id,
      };
  
      dispatch({ type: 'CREATE', todo: createdTodo });
  
      // fetchTodos 함수를 직접 정의하여 호출
      const fetchTodos = async () => {
        try {
          const response = await axios.get('http://localhost:9090/TodoList/todoContent', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const todos = response.data.map(item => ({
            id: item.id,
            text: item.todoContent,
            done: item.done,
            createDate: item.create,
          }));
  
          dispatch({
            type: 'SET_TODOS',
            todos: todos,
          });
        } catch (error) {
          console.error('TodoList를 불러오는 중 에러가 발생했습니다: ', error);
        }
      };
  
      await fetchTodos(); // 직접 정의한 fetchTodos 호출
  
      setValue('');
      setOpen(false);
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
