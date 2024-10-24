import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // createAsyncThunk를 사용하여 API 호출 정의
export const fetchTabData = createAsyncThunk(
  'memberManagement/fetchTabData',
  async ({ tab, page }, thunkApi) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/member`, {
        params: {
          tab,
          page: page - 1,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      return { tab, data: response.data };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);