import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { fetchTabData } from "../apis/memberManagementApis";

  
const memberSlice = createSlice({
    name: 'memberManagement',
    initialState: {
      usersData: [],      // users 관련 데이터
      projectsData: [],   // projects 관련 데이터
      page: 0,
      totalPages: 1,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTabData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTabData.fulfilled, (state, action) => {
          const { tab, data } = action.payload;  // action.payload에 전달된 데이터
          if (tab === 'users') {
            state.usersData = data.pageItems.content;  // users 데이터 저장
          } else if (tab === 'projects') {
            state.projectsData = data.pageItems.content; // projects 데이터 저장
          }
          state.page = data.pageItems.pageable.pageNumber + 1;
          state.totalPages = data.pageItems.totalPages;
          state.loading = false;
        })
        .addCase(fetchTabData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;  // 에러도 payload로 전달됨
        });
    }
  });
  
  
  
  export default memberSlice.reducer;