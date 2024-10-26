import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// tasks ID로 MongoDB의 tasks 데이터를 가져오는 비동기 Thunk 함수
export const fetchTasksById = createAsyncThunk(
  'labelTask/fetchTasksById',
  async (tasksId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9090/mongo/tasks/${tasksId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// LabelTask 데이터를 가져오는 Thunk 함수 추가
export const fetchLabelTaskByTasksId = createAsyncThunk(
  'labelTask/fetchLabelTaskByTasksId',
  async (tasksId, { rejectWithValue }) => {
    try {
      // tasksId를 통해 fieldId를 먼저 가져옵니다.
      const taskResponse = await axios.get(`http://localhost:9090/mongo/tasks/${tasksId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      const fieldId = taskResponse.data.fieldId; // fieldId 추출

      // fieldId를 사용하여 LabelTask 데이터를 가져옵니다.
      const labelTaskResponse = await axios.get(`http://localhost:9090/labeltask/data/field/${fieldId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      return labelTaskResponse.data; // LabelTask 데이터 반환
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 추가적인 Thunk 함수는 여기에 계속 추가

// labelTask 반려 요청을 처리하는 Thunk 함수 추가
export const rejectLabelTask = createAsyncThunk(
    'labelTask/rejectLabelTask',
    async ({ taskId, rejectionReason }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:9090/labeltask/reject`, {
                taskId: taskId,
                rejectionReason: rejectionReason,
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// labelTask 승인 요청을 처리하는 Thunk 함수 추가
export const approveLabelTask = createAsyncThunk(
    'labelTask/approveLabelTask',
    async ({ taskId, comment }, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`http://localhost:9090/labeltask/approve`, {
          taskId: taskId,
          comment: comment
        }, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
          }
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const submitForReview = createAsyncThunk(
  'labelTask/submitForReview',
  async ({ taskId, fieldId, comment }, { rejectWithValue }) => {
    try {
      // API 호출을 Thunk 함수 내부에서 직접 수행
      const response = await axios.patch(`http://localhost:9090/labeltask/submit`, {
        taskId,
        fieldId,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      return response.data; // 성공적으로 데이터를 반환
    } catch (error) {
      return rejectWithValue(error.response.data); // 오류 발생 시 오류 데이터 반환
    }
  }
);



// LabelTask를 가져오는 Thunk 함수
export const fetchLabelTasks = createAsyncThunk(
  'labelTask/fetchLabelTasks',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9090/labeltask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// FieldValue를 가져오는 Thunk 함수
export const fetchFieldValue = createAsyncThunk(
  'labelTask/fetchFieldValue',
  async (fieldId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9090/labeltask/fieldValue/${fieldId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// FieldValue 업데이트를 위한 Thunk 함수
export const updateFieldValue = createAsyncThunk(
  'labelTask/updateFieldValue',
  async ({ fieldId, checked }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:9090/labeltask/updateFieldValue`, {
        fieldId,
        checked
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);