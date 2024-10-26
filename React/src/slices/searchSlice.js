import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchTasks } from '../apis/searchApis';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (criteria, { rejectWithValue }) => {
    try {
      return await searchTasks(criteria);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    selectedCategory1: '',
    selectedCategory2: '',
    selectedCategory3: '',
    selectedWorkStatus: '',
    category2Options: [],
    category3Options: [],
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCategory1(state, action) {
      state.selectedCategory1 = action.payload;
      state.selectedCategory2 = '';
      state.selectedCategory3 = '';
      state.category2Options = [];
      state.category3Options = [];
    },
    setCategory2Options(state, action) {
      state.category2Options = action.payload;
    },
    setSelectedCategory2(state, action) {
      state.selectedCategory2 = action.payload;
      state.selectedCategory3 = '';
      state.category3Options = [];
    },
    setCategory3Options(state, action) {
      state.category3Options = action.payload;
    },
    setSelectedCategory3(state, action) {
      state.selectedCategory3 = action.payload;
    },
    setSelectedWorkStatus(state, action) {
      state.selectedWorkStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedCategory1,
  setCategory2Options,
  setSelectedCategory2,
  setCategory3Options,
  setSelectedCategory3,
  setSelectedWorkStatus,
  setSearchKeyword,
} = searchSlice.actions;

export default searchSlice.reducer;
