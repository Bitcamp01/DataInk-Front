import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../apis/mypageApis';

const eventSlice = createSlice({
    name: 'event',
    initialState: {
    events: [],
    status: 'idle',
    error: null,
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchEvents.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.events = action.payload;
        })
        .addCase(fetchEvents.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            alert('이벤트 데이터를 불러오는 중 에러가 발생했습니다.');
        })
        .addCase(addEvent.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.events.push(action.payload);
        })
        .addCase(addEvent.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            alert('이벤트 추가 중 에러가 발생했습니다.');
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
            console.log(action.payload);
            state.status = 'succeeded';
            state.events = action.payload;
        })
        .addCase(updateEvent.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            alert('이벤트 수정 중 에러가 발생했습니다.');
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.events = action.payload;
        })
        .addCase(deleteEvent.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            alert('이벤트 삭제 중 에러가 발생했습니다.');
        });
    }
});

export const { setEvents } = eventSlice.actions;
export default eventSlice.reducer;