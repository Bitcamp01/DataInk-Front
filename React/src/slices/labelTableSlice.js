import { createSlice } from "@reduxjs/toolkit";
import { fetchFolders } from "../apis/labelTableApis";

// 폴더 상태 관리 slice 생성
const labelTableSlice = createSlice({
    name: 'labelTable',
    initialState: {
      projectId: null,  // projectId 상태 추가
      items: [],        // 폴더 목록을 위한 초기 상태
    },
    reducers: {
      setProjectId: (state, action) => {
        state.projectId = action.payload; // projectId 설정 액션
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFolders.fulfilled, (state, action) => {
          state.items = action.payload;
        });
    },
  });
  
  export const { setProjectId } = labelTableSlice.actions;
  
  export default labelTableSlice.reducer;
