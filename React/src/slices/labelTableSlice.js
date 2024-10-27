import { createSlice } from "@reduxjs/toolkit";
import { fetchFolders, fetchTasksByFolderId, fetchProjectEndDate, submitForReview } from "../apis/labelTableApis";

// 폴더 상태 관리 slice 생성
const labelTableSlice = createSlice({
    name: 'labelTable',
    initialState: {
      projectId: null,        // projectId 상태 추가
      items: [],              // 폴더 목록을 위한 초기 상태
      tableData: [],          // 테이블 데이터 상태 추가
      endDate: null,          // 프로젝트 마감일 상태 추가
      selectedFolderId: null, // 선택된 폴더 ID 상태
      currentPage: 1,         // 페이지네이션 상태 추가
    },
    reducers: {
      setProjectId: (state, action) => {
        state.projectId = action.payload; // projectId 설정 액션
      },
      setSelectedFolderId: (state, action) => {
        state.selectedFolderId = action.payload; // 선택된 폴더 ID 설정 액션
      },
      setTableData: (state, action) => {
        state.tableData = action.payload; // 파일 목록 데이터를 테이블에 설정
      },
      // 테이블 데이터를 초기화하는 액션
      clearTableData(state) {
        state.tableData = [];  // 빈 배열로 초기화
      },
      setEndDate: (state, action) => {
        state.endDate = action.payload; // 프로젝트 마감일 설정
      },
      setCurrentPage: (state, action) => {
        state.currentPage = action.payload; // 페이지 변경 액션
      },
      resetPage: (state) => {
        state.currentPage = 1; // 페이지를 1로 초기화하는 액션
      },
      clearFolders(state) {
        state.items = []; // 폴더 데이터 초기화 액션 추가
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFolders.fulfilled, (state, action) => {
          state.items = action.payload; // 폴더 목록 설정
        })
        .addCase(fetchTasksByFolderId.fulfilled, (state, action) => {
          state.tableData = action.payload; // 선택된 폴더의 파일 목록 설정
        })
        .addCase(fetchProjectEndDate.fulfilled, (state, action) => {
          state.endDate = action.payload; // 프로젝트 마감일 설정
        })
        // 검수 요청 상태 처리
        .addCase(submitForReview.fulfilled, (state, action) => {
          return state;
        })
        .addCase(submitForReview.rejected, (state, action) => {
          return state;
        });
    },
});

export const { setProjectId, setSelectedFolderId, setTableData, clearTableData, setEndDate, 
  setCurrentPage, resetPage, clearFolders } = labelTableSlice.actions;

export default labelTableSlice.reducer;
