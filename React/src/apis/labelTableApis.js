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
  