import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
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
            size: 15
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
          }
        });
        return response.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
  );
  
  const memberSlice = createSlice({
    name: 'memberManagement',
    initialState: {
      data: [],
      page: 0,
      totalPages: 1,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTabData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTabData.fulfilled, (state, action) => {
          state.data = action.payload.content;
          state.page = action.payload.pageable.pageNumber + 1;
          state.totalPages = action.payload.totalPages;
          state.loading = false;
        })
        .addCase(fetchTabData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default memberSlice.reducer;