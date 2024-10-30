import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 비동기 Thunk 함수로 폴더 데이터를 가져옴
export const fetchFolders = createAsyncThunk(
    'labelTable/fetchFolders',
    async (projectId, thunkApi) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects/test`,{
            params:{
              projectId
            }, 
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
          }
        });
        console.log("개편 후 데이터:", response.data.folders);
        return response.data.folders;
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
      const response = await axios.get(`${API_BASE_URL}/mongo/tasks/folder/${folderId}`, {
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
      const response = await axios.get(`${API_BASE_URL}/projects/enddate/${projectId}`, {
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

// 비동기 작업 정의 (검수 요청 - 상태 업데이트)
export const submitForReview = createAsyncThunk(
  'labelTable/submitForReview',
  async (taskIds, { rejectWithValue }) => {
    try {
      // taskIds를 보내서 상태를 업데이트하는 API 호출
      const response = await axios.put(`${API_BASE_URL}/mongo/tasks/update-submit`, taskIds, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                },
            });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);