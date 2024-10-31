import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_HEADER = {
  Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
};

// tasks ID로 MongoDB의 tasks 데이터를 가져오는 비동기 Thunk 함수
export const fetchTasksById = createAsyncThunk(
  'labelTask/fetchTasksById',
  async (tasksId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/mongo/tasks/${tasksId}`, {
        headers: AUTH_HEADER,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// LabelTask 데이터를 가져오는 Thunk 함수 추가
export const fetchLabelTaskByTasksId = createAsyncThunk(
  'labelTask/fetchLabelTaskByTasksId',
  async (tasksId, { rejectWithValue }) => {
    try {
      const taskResponse = await axios.get(`${API_BASE_URL}/mongo/tasks/${tasksId}`, {
        headers: AUTH_HEADER,
      });
      const fieldId = taskResponse.data.fieldId; // fieldId 추출

      // 필드 ID를 사용하여 LabelTask 데이터를 가져오기
      const labelTaskResponse = await axios.get(`${API_BASE_URL}/labeltask/data/field/${fieldId}`, {
        headers: AUTH_HEADER,
      });
      return labelTaskResponse.data; // LabelTask 데이터 반환
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// labelTask 반려 요청을 처리하는 Thunk 함수 추가
export const rejectLabelTask = createAsyncThunk(
  'labelTask/rejectLabelTask',
  async (obj, { rejectWithValue }) => {
    console.log("!11111111111111111111111111111111");
    console.log(obj);
    try {
      const { taskId, rejectionReason, transformedData } = obj; // 각각의 값 분리
      const response = await axios.patch(`${API_BASE_URL}/labeltask/reject`,
      {
        rejectionReason, // 본문으로 rejectionReason 전달
        transformedData // 본문으로 transformedData 전달
      },
      {
        headers: AUTH_HEADER,
        params: { taskId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// labelTask 승인 요청을 처리하는 Thunk 함수 추가
export const approveLabelTask = createAsyncThunk(
  'labelTask/approveLabelTask',
  async (obj, { rejectWithValue }) => {
    try {
      const { taskId, comment, transformedData } = obj; // 각각의 값 분리
      const response = await axios.patch(`${API_BASE_URL}/labeltask/approve`, {
        comment, // 본문으로 comment 전달
        transformedData // 본문으로 transformedData 전달
      }, {
        headers: AUTH_HEADER,
        params: { taskId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// submitForReview Thunk 함수 추가
export const submitForReview = createAsyncThunk(
  'labelTask/submitForReview',
  async ({ taskId, fieldId, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/labeltask/submit`, {
        taskId,
        fieldId,
        comment,
      }, {
        headers: AUTH_HEADER,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// LabelTask를 가져오는 Thunk 함수
export const fetchLabelTasks = createAsyncThunk(
  'labelTask/fetchLabelTasks',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/labeltask/${taskId}`, {
        headers: AUTH_HEADER,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// FieldValue를 가져오는 Thunk 함수
export const fetchFieldValue = createAsyncThunk(
  'labelTask/fetchFieldValue',
  async (fieldId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/labeltask/fieldValue/${fieldId}`, {
        headers: AUTH_HEADER,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// FieldValue 업데이트를 위한 Thunk 함수
export const updateFieldValue = createAsyncThunk(
  'labelTask/updateFieldValue',
  async ({ fieldId, checked }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/labeltask/updateFieldValue`, {
        fieldId,
        checked,
      }, {
        headers: AUTH_HEADER,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Folders를 가져오는 Thunk 함수
export const fetchFolders = createAsyncThunk(
  'labelTask/fetchFolders',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/folders/${taskId}`, {
        headers: AUTH_HEADER,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Fields를 가져오는 Thunk 함수
export const fetchFields = createAsyncThunk(
  'labelTask/fetchFields',
  async (itemIds, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fields/${itemIds}`, {
        headers: AUTH_HEADER,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);



// 1028 필드밸류 가져오기 위한 메서드 새로 작성해봄
export const fetchLabelTaskDetails = createAsyncThunk(
  'labelTask/fetchLabelTaskDetails',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/labeltask/taskDetails/${taskId}`, {
        headers: AUTH_HEADER,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || '에러 발생');
    }
  }
);

// 관리자에서 승인 버튼 누를 때 사용
export const adminLabelTask = createAsyncThunk(
  'labelTask/adminLabelTask',
  async (obj, { rejectWithValue }) => {
    console.log("!11111111111111111111111111111111");
    console.log(obj);
    try {
      const { taskId, transformedData } = obj; // 각각의 값 분리
      const response = await axios.patch(`${API_BASE_URL}/labeltask/adminapprove`,
      {
        transformedData // 본문으로 transformedData 전달
      },
      {
        headers: AUTH_HEADER,
        params: { taskId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);