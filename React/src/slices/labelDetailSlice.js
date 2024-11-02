import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    saveLabelTask,
    fetchLabelTaskDetails
} from '../apis/labelDetailApis';
import axios from 'axios';

const labelDetailSlice = createSlice({
    name: 'labelTask',
    initialState: {
      taskData: null, // MongoDB의 tasks 데이터
      labelTaskData: null, // LabelTask 데이터
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(saveLabelTask.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(saveLabelTask.fulfilled, (state) => {
          state.loading = false;
          // 승인 작업 성공 시 추가 작업 (예: 상태 업데이트)
        })
        .addCase(saveLabelTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // 1028 필드밸류 가져오기 위한 메서드 새로 작성해봄
        .addCase(fetchLabelTaskDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLabelTaskDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.labelTaskData = action.payload; // 가져온 LabelTask 데이터를 상태에 저장
        })
        .addCase(fetchLabelTaskDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  // Slice 내보내기
  export default labelDetailSlice.reducer;
  export const { actions } = labelDetailSlice; // Slice의 액션도 내보내기
  
  