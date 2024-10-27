import { createSlice } from "@reduxjs/toolkit";
import { getUserProjects, updateBookmarkStatus } from "../apis/userProjectsApis";

const userProjectsSlice = createSlice({
  name: 'userProjects',
  initialState: {
    projects: [],        // 참여 중인 project들 정보
    userProjects: [],    // 유저와 프로젝트 관계 정보 (북마크 상태 등)
    projectCount: 0      // 프로젝트 개수 상태 추가
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProjects.fulfilled, (state, action) => {
        // 응답에서 projects와 userProjects로 분리
        const { projects, userProjects } = action.payload.item;

        // projects에 isBookmarked 값 추가
        const updatedProjects = projects.map((project) => {
          const userProject = userProjects.find(up => up.projectId === project.projectId);
          return {
            ...project,
            isBookmarked: userProject ? userProject.isBookmarked : false
          };
        });

        // 상태 업데이트
        state.projects = updatedProjects;
        state.userProjects = userProjects;
        state.projectCount = state.projects.length; // projects 배열의 길이를 기반으로 프로젝트 개수 설정

        console.log(updatedProjects);
      })
      .addCase(getUserProjects.rejected, (state, action) => {
        return state;
      })
      .addCase(updateBookmarkStatus.fulfilled, (state, action) => {
        // 업데이트된 북마크 상태 반영
        const projectId = action.payload.projectId;
        const isBookmarked = action.payload.isBookmarked;
        const project = state.projects.find(p => p.projectId === projectId);
        if (project) {
            project.isBookmarked = isBookmarked;
        }
      })
      .addCase(updateBookmarkStatus.rejected, (state, action) => {
        return state;
      });
  },
});

export default userProjectsSlice.reducer;
