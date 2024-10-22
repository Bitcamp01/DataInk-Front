import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

  // createAsyncThunk를 사용하여 API 호출 정의
export const fetchTabData = createAsyncThunk(
  'memberManagement/fetchTabData',
  async ({ tab, page }, thunkApi) => {
    try {
      const response = await axios.get(`http://localhost:9090/member`, {
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