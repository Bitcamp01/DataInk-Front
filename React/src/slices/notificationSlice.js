// slices/notificationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLatest, fetchLatestNotifications } from '../apis/notificationApis';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLatest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLatest.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchLatest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default notificationSlice.reducer;
