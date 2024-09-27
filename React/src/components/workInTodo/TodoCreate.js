import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoNextId } from './TodoContext';
import { FaCircle } from 'react-icons/fa'; // 원하는 아이콘으로 변경

// 입력 폼을 감싸는 위치 설정
const InputFormWrapper = styled.div`
  margin-top: 20px;
`;

// 입력 폼 스타일
const InputForm = styled.form`
  display: flex;
  align-items: center;
`;

// 아이콘 스타일
const Icon = styled(FaCircle)`
  color: white; // 원하는 색상으로 변경
  border: 1px solid #C1C1C1;
  margin-right: 20px;
  margin-left: 35px;
  width: 14px;
  height: 14px;
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === '') return; // 빈 값 방지
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue(''); // 입력값 초기화
    setOpen(false); // 입력 폼 닫기
    nextId.current += 1; // 다음 ID 증가
  };

  return (
    <>
      {open && (
        <InputFormWrapper>
          <InputForm onSubmit={onSubmit}>
            <Icon />
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
