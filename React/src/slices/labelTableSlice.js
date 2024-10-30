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
      loading: false, // 로딩 상태 추가
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
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true; // 폴더 데이터 로딩 시작
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false; // 폴더 데이터 로딩 완료
      })
      .addCase(fetchFolders.rejected, (state) => {
        state.loading = false; // 폴더 데이터 로딩 실패
      })
      .addCase(fetchTasksByFolderId.pending, (state) => {
        state.loading = true; // 작업 데이터 로딩 시작
      })
      .addCase(fetchTasksByFolderId.fulfilled, (state, action) => {
        state.tableData = action.payload;
        state.loading = false; // 작업 데이터 로딩 완료
      })
      .addCase(fetchTasksByFolderId.rejected, (state) => {
        state.loading = false; // 작업 데이터 로딩 실패
      })
      .addCase(fetchProjectEndDate.pending, (state) => {
        state.loading = true; // 프로젝트 마감일 로딩 시작
      })
      .addCase(fetchProjectEndDate.fulfilled, (state, action) => {
        state.endDate = action.payload;
        state.loading = false; // 프로젝트 마감일 로딩 완료
      })
      .addCase(fetchProjectEndDate.rejected, (state) => {
        state.loading = false; // 프로젝트 마감일 로딩 실패
      })
      .addCase(submitForReview.pending, (state) => {
        state.loading = true; // 검수 요청 처리 중
      })
      .addCase(submitForReview.fulfilled, (state, action) => {
        state.loading = false; // 검수 요청 처리 완료
      })
      .addCase(submitForReview.rejected, (state) => {
        state.loading = false; // 검수 요청 처리 실패
      });
  },
});

export const { setProjectId, setSelectedFolderId, setTableData, clearTableData, setEndDate, 
  setCurrentPage, resetPage, clearFolders } = labelTableSlice.actions;

export default labelTableSlice.reducer;
