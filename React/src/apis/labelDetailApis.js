// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // 환경 변수에서 API URL 가져오기
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const AUTH_HEADER = {
//   Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
// };

// labelTask에 다시 수정한 내용 넣는 요청을 처리하는 Thunk 함수 추가
// export const saveLabelTask = createAsyncThunk(
//     'labelTask/approveLabelTask', // 이 부분 컨트롤러 만들어서
//     async (obj, { rejectWithValue }) => {
//       try {
//         const { taskId, transformedData } = obj; // 각각의 값 분리
//         const response = await axios.patch(`${API_BASE_URL}/labeltask/approve`, { // 이 부분도 컨트롤러 만들면 바꿔라
//           transformedData // 본문으로 transformedData 전달
//         }, {
//           headers: AUTH_HEADER,
//           params: { taskId }
//         });
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response?.data || 'An error occurred');
//       }
//     }
//   );

// 1028 필드밸류 가져오기 위한 메서드 새로 작성해봄
// export const fetchLabelTaskDetails = createAsyncThunk(
//     'labelTask/fetchLabelTaskDetails',
//     async (taskId, { rejectWithValue }) => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/labeltask/taskDetails/${taskId}`, {
//           headers: AUTH_HEADER,
//         });
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response?.data || '에러 발생');
//       }
//     }
//   );