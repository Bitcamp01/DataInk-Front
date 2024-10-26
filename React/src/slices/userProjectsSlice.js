import { createSlice } from "@reduxjs/toolkit";
import { getUserProjects } from "../apis/userProjectsApis";

const userProjectsSlice = createSlice({
  name: 'userProjects',
  initialState: {
    projects: [],        // 참여 중인 project들 정보
    projectCount: 0      // 프로젝트 개수 상태 추가
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.projects = action.payload; // 참여 중인 project들 설정
        state.projectCount = action.payload.length; // 프로젝트 개수 설정
        console.log(action.payload);
      })
      .addCase(getUserProjects.rejected, (state, action) => {
        return state;
      });
  },
});

export default userProjectsSlice.reducer;
