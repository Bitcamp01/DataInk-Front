import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTasksById,
  fetchLabelTaskByTasksId,
  rejectLabelTask,
  approveLabelTask,
  fetchFieldValue,
  submitForReview,
  fetchLabelTaskDetails
} from '../apis/labelTaskApis';
import axios from 'axios';

const labelTaskSlice = createSlice({
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
      .addCase(fetchTasksById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksById.fulfilled, (state, action) => {
        state.loading = false;
        state.taskData = action.payload; // tasks 데이터를 상태에 저장
      })
      .addCase(fetchTasksById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLabelTaskByTasksId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabelTaskByTasksId.fulfilled, (state, action) => {
        state.loading = false;
        state.labelTaskData = action.payload; // LabelTask 데이터를 상태에 저장
      })
      .addCase(fetchLabelTaskByTasksId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rejectLabelTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectLabelTask.fulfilled, (state) => {
        state.loading = false;
        // 반려 작업 성공 시 추가 작업 (예: 상태 업데이트)
      })
      .addCase(rejectLabelTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveLabelTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveLabelTask.fulfilled, (state) => {
        state.loading = false;
        // 승인 작업 성공 시 추가 작업 (예: 상태 업데이트)
      })
      .addCase(approveLabelTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFieldValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFieldValue.fulfilled, (state, action) => {
        state.loading = false;
        state.taskData = action.payload; // fieldValue를 상태에 저장
      })
      .addCase(fetchFieldValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitForReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitForReview.fulfilled, (state) => {
        state.loading = false;
        // 승인 요청 성공 시 추가 작업 (예: 상태 업데이트)
      })
      .addCase(submitForReview.rejected, (state, action) => {
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
export default labelTaskSlice.reducer;
export const { actions } = labelTaskSlice; // Slice의 액션도 내보내기







// import { createSlice } from '@reduxjs/toolkit';
// import { fetchLabelTasks, fetchFieldValue, rejectLabelTask } from '../apis/labelTaskApis'; // 수정된 Thunk 함수 import


// const labelTaskSlice = createSlice({
//   name: 'labelTask',
//   initialState: {
//     taskData: [], // labelTask 데이터를 저장할 초기 상태를 빈 배열로 설정
//     fieldValueData: [], // **fieldValue 데이터를 저장할 상태 추가**
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLabelTasks.pending, (state) => {
//         state.loading = true;  // 로딩 상태를 true로 설정
//         state.error = null;    // 에러 초기화
//       })
//       .addCase(fetchLabelTasks.fulfilled, (state, action) => {
//         state.loading = false;  // 로딩 상태를 false로 설정
//         state.taskData = action.payload;  // 응답 데이터를 배열에 저장
//       })
//       .addCase(fetchLabelTasks.rejected, (state, action) => {
//         state.loading = false;  // 로딩 상태를 false로 설정
//         state.error = action.payload;  // 에러 메시지 저장
//       })
//       .addCase(fetchFieldValue.pending, (state) => { // **추가된 pending 상태**
//         state.loading = true; // fieldValue 요청 중 로딩 상태
//         state.error = null;
//       })
//       .addCase(fetchFieldValue.fulfilled, (state, action) => { // **추가된 fulfilled 상태**
//         state.loading = false;
//         state.fieldValueData = action.payload; // fieldValue 데이터 저장
//       })
//       .addCase(fetchFieldValue.rejected, (state, action) => { // **추가된 rejected 상태**
//         state.loading = false;
//         state.error = action.payload; // 에러 저장
//       })
//       .addCase(rejectLabelTask.pending, (state) => {
//         state.loading = true; // 로딩 상태를 true로 설정
//         state.error = null;   // 에러 초기화
//       })
//       .addCase(rejectLabelTask.fulfilled, (state, action) => {
//         state.loading = false; // 로딩 상태를 false로 설정
//         // 여기서 반려 작업 성공 시 추가 작업 가능 (예: taskData 업데이트)
//       })
//       .addCase(rejectLabelTask.rejected, (state, action) => {
//         state.loading = false; // 로딩 상태를 false로 설정
//         state.error = action.payload; // 에러 메시지 저장
//       });
//   },
// });

// export default labelTaskSlice.reducer;
