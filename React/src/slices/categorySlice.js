import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory1: '',
  selectedCategory2: '',
  selectedCategory3: '',
  selectedWorkStatus: '',
  category2Options: [],
  category3Options: []
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory1(state, action) {
      state.selectedCategory1 = action.payload;
      state.selectedCategory2 = ''; // 대분류가 바뀌면 중분류 초기화
      state.selectedCategory3 = ''; // 대분류가 바뀌면 소분류 초기화
    },
    setCategory2Options(state, action) {
      state.category2Options = action.payload; // 대분류에 따른 중분류 옵션 설정
    },
    setSelectedCategory2(state, action) {
      state.selectedCategory2 = action.payload;
      state.selectedCategory3 = ''; // 중분류가 바뀌면 소분류 초기화
    },
    setCategory3Options(state, action) {
      state.category3Options = action.payload; // 중분류에 따른 소분류 옵션 설정
    },
    setSelectedCategory3(state, action) {
      state.selectedCategory3 = action.payload;
    },
    setSelectedWorkStatus(state, action) {
      state.selectedWorkStatus = action.payload;
    }
  },
});

export const {
  setSelectedCategory1,
  setCategory2Options,
  setSelectedCategory2,
  setCategory3Options,
  setSelectedCategory3,
  setSelectedWorkStatus,
} = categorySlice.actions;

export default categorySlice.reducer;
