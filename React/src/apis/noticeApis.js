import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const post = createAsyncThunk(
    'notice/post',
    async (formData, thunkApi) => {
      try{
        const response = await axios.post(`${API_BASE_URL}/notice`, formData,{
          headers:{
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            "Content-Type" : "multipart/form-data"
          }
        });
  
        return response.data;
      } catch(e) {
        console.log("API Error: ", e.response ? e.response.data : e.message);
        return thunkApi.rejectWithValue(e);
      }
    }
  );
  
  export const getNotice = createAsyncThunk(
    'notice/getNotice',
    async (searchObj, thunkApi) => {
        const { page } = searchObj; 
        try {
            const response = await axios.get(`${API_BASE_URL}/notice`,  {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                },
                params: {
                    searchCondition: searchObj.searchCondition,
                    searchKeyword: searchObj.searchKeyword,
                    page
                }
            });

            return response.data;
        } catch(e) {
            return thunkApi.rejectWithValue(e);
        }
    }
  );

export const noticeSlice = createSlice({
  name: "notice",
  initialState: {
    data: null, // 또는 data: []
    loading: false,
    error: null,
    totalPages: 0, // totalPages 초기값 설정
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotice.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Action payload:", action); // action의 내용을 확인
        state.data = action.payload.pageItems.content; // API의 content 데이터
        state.totalPages = action.payload.pageItems.totalPages; // totalPages 저장
        console.log("Stored totalPages:", state.totalPages); // 저장된 totalPages 확인
      })
      .addCase(getNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("API Error: ", action.error.message);
      });
  },
});
