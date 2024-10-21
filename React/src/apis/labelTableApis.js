import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 Thunk 함수로 폴더 데이터를 가져옴
export const fetchFolders = createAsyncThunk(
    'labelTable/fetchFolders',
    async (projectId, thunkApi) => {
      try {
        const response = await axios.get(`http://localhost:9090/projects/${projectId}/folders`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
          }
        });
        return response.data;
      } catch (e) {
        return thunkApi.rejectWithValue(e.response.data);
      }
    }
);

// 폴더별로 파일 목록 가져오기
export const fetchTasksByFolderId = createAsyncThunk(
  'labelTable/fetchTasksByFolderId',
  async (folderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9090/mongo/tasks/folder/${folderId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      return response.data || [];  // 응답 데이터가 배열이 아니면 빈 배열을 반환
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 프로젝트 마감일 가져오기
export const fetchProjectEndDate = createAsyncThunk(
  'labelTable/fetchProjectEndDate',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9090/projects/enddate/${projectId}`, {
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
  