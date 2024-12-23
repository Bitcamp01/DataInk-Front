import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (criteria, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/mongo/tasks/search`, criteria, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Search request failed:", error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);