import { createSlice } from "@reduxjs/toolkit";
import { getUserProjects } from "../apis/userProjectsApis";

// 폴더 상태 관리 slice 생성
const userProjectsSlice = createSlice({
    name: 'userProjects',
    initialState: {
      projects: []       // 참여 중인 project들 정보
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getUserProjects.fulfilled, (state, action) => {
          state.projects = action.payload; // 참여 중인 project들 설정
          console.log(action.payload);
        })
        .addCase(getUserProjects.rejected, (state, action) => {
          return state;
        });
    },
});

export default userProjectsSlice.reducer;
