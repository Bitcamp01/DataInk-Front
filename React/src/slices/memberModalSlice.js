import { createSlice} from "@reduxjs/toolkit";
import { fetchModalData } from "../apis/memberManagementApis";


const memberModalSlice = createSlice({
    name: 'modalManagement',
    initialState: {
      modalDatas: [],    // 모달에 표시할 데이터
      page: 0,
      totalPages: 1,
      loading: false,
      error: null
    },
    reducers: {
        // page 값을 증가시키는 액션 추가
        incrementPage: (state) => {
        state.page += 1;
      }
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchModalData.fulfilled, (state, action) => {
        const data = action.payload;

        state.modalDatas = data.content; // 기존 데이터에 새 데이터 병합
        state.totalPages = data.totalPages || 1;
        state.loading = false;
        console.log("리듀서 쪽: ", [...state.modalDatas, ...data.content]);
      })
      .addCase(fetchModalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
  });
  
  export default memberModalSlice.reducer;