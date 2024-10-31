import { createSlice } from '@reduxjs/toolkit';
import { fetchCalendars, addCalendar, updateCalendar, deleteCalendar } from '../apis/mypageApis';

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        calendars: [],
        status: 'idle', // 상태: 'idle', 'loading', 'succeeded', 'failed'
        error: null, // 에러 메시지
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalendars.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.calendars = action.payload;
            })
            .addCase(fetchCalendars.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                alert('캘린더 데이터를 불러오는 중 에러가 발생했습니다.');
            })
            .addCase(addCalendar.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.calendars.push(action.payload);
            })
            .addCase(addCalendar.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                alert('캘린더 추가 중 에러가 발생했습니다.');
            })
            .addCase(updateCalendar.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedCalendar = action.payload;
                const index = state.calendars.findIndex(calendar => calendar.id === updatedCalendar.id);
                if (index !== -1) {
                    state.calendars[index] = updatedCalendar;
                }
            })
            .addCase(updateCalendar.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                alert('캘린더 수정 중 에러가 발생했습니다.');
            })
            .addCase(deleteCalendar.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const deletedCalendarId = action.payload;
                state.calendars = state.calendars.filter(calendar => calendar.id !== deletedCalendarId);
            })
            .addCase(deleteCalendar.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                alert('캘린더 삭제 중 에러가 발생했습니다.');
            });
    }
});

export default calendarSlice.reducer;
