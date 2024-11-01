// slices/notificationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLatestNotifications } from '../apis/notificationApis';

export const getLatestNotifications = createAsyncThunk(
    'notifications/fetchLatest',
    async () => {
        const notifications = await fetchLatestNotifications();
        return notifications;
    }
);

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
            .addCase(getLatestNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLatestNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getLatestNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default notificationSlice.reducer;
