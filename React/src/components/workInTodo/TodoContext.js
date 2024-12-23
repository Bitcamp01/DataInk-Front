import axios from 'axios';
import React, { useReducer, createContext, useContext, useRef, useEffect } from 'react';

const initialTodos = [];

function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_TODOS': // 서버에서 불러온 투두리스트 설정
      return action.todos;
    case 'CREATE': // 새로운 투두 생성
      return state.concat(action.todo);
    case 'TOGGLE': // 투두 완료 상태 토글
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE': // 투두 삭제
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  // 환경 변수에서 API URL 가져오기
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;  

  useEffect(() => {
    const fetchTodos = async () => {
      const token = sessionStorage.getItem('ACCESS_TOKEN');
      try {
        const response = await axios.get(`${API_BASE_URL}/TodoList/todoContent`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const items = response.data;
        const todos = items.map(item => ({
          id: item.todoId,
          text: item.todoContent,
          done: item.completed,
          createDate: item.createdDate,
        }));

        dispatch({
          type: 'SET_TODOS',
          todos: todos 
        });
      } catch (error) {
        console.error('TodoList를 불러오는 중 에러가 발생했습니다: ', error);
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}
