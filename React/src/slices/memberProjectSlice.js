import { createSlice } from "@reduxjs/toolkit";
import { fetchProjectMembers } from "../apis/memberManagementApis";

const memberProjectSlice = createSlice({
    name: 'memberProject',
    initialState: {
      projectMembers: [], // 특정 프로젝트의 멤버 목록
      allMembers: [], // 전체 멤버 목록
      status: 'idle', // 요청 상태
      error: null,
    },
    reducers: {
      setProjectMembers(state, action) {
        state.projectMembers = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProjectMembers.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProjectMembers.fulfilled, (state, action) => ({
          ...state,
          projectMembers: action.payload.items
        }))
        .addCase(fetchProjectMembers.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
    },
  });
  
  export const { setProjectMembers } = memberProjectSlice.actions;
  
  export default memberProjectSlice.reducer;