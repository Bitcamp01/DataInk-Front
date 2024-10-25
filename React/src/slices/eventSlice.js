// // import { createSlice } from '@reduxjs/toolkit';
// // import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../apis/mypageApis';

// // const eventSlice = createSlice({
// //     name: 'event',
// //     initialState: {
// //     events: [],
// //     status: 'idle',
// //     error: null,
// //     },
// //     reducers: {},
// //     extraReducers: (builder) => {
// //     builder
// //         .addCase(fetchEvents.fulfilled, (state, action) => {
// //             state.status = 'succeeded';
// //             state.events = action.payload;
// //         })
// //         .addCase(fetchEvents.rejected, (state, action) => {
// //             state.status = 'failed';
// //             state.error = action.payload;
// //             alert('이벤트 데이터를 불러오는 중 에러가 발생했습니다.');
// //         })
// //         .addCase(addEvent.fulfilled, (state, action) => {
// //             state.status = 'succeeded';
// //             state.events.push(action.payload);
// //             alert('이벤트가 성공적으로 추가되었습니다.');
// //         })
// //         .addCase(addEvent.rejected, (state, action) => {
// //             state.status = 'failed';
// //             state.error = action.payload;
// //             alert('이벤트 추가 중 에러가 발생했습니다.');
// //         })
// //         .addCase(updateEvent.fulfilled, (state, action) => {
// //             state.status = 'succeeded';
// //             const index = state.events.findIndex(event => event.id === action.payload.id);
// //                 if (index !== -1) {
// //                     state.events[index] = action.payload;
// //                 }
// //                 alert('이벤트가 성공적으로 수정되었습니다.');
// //         })
// //         .addCase(updateEvent.rejected, (state, action) => {
// //             state.status = 'failed';
// //             state.error = action.payload;
// //             alert('이벤트 수정 중 에러가 발생했습니다.');
// //         })
// //         .addCase(deleteEvent.fulfilled, (state, action) => {
// //             state.status = 'succeeded';
// //             state.events = state.events.filter(event => event.id !== action.payload);
// //             alert('이벤트가 성공적으로 삭제되었습니다.');
// //         })
// //         .addCase(deleteEvent.rejected, (state, action) => {
// //             state.status = 'failed';
// //             state.error = action.payload;
// //             alert('이벤트 삭제 중 에러가 발생했습니다.');
// //         });
// //     }
// // });

// // export default eventSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchEventsApi, addEventApi, updateEventApi, deleteEventApi } from '../apis/mypageApis';

// export const fetchEvents = createAsyncThunk('event/fetchEvents', async () => {
//     const response = await fetchEventsApi();
//     return response.data;
// });

// export const addNewEvent = createAsyncThunk('event/addNewEvent', async (event) => {
//     const response = await addEventApi(event);
//     return response.data;
// });

// export const updateExistingEvent = createAsyncThunk('event/updateExistingEvent', async (event) => {
//     const response = await updateEventApi(event);
//     return response.data;
// });

// export const deleteExistingEvent = createAsyncThunk('event/deleteExistingEvent', async (eventId) => {
//     await deleteEventApi(eventId);
//     return eventId;
// });

// const eventSlice = createSlice({
//     name: 'event',
//     initialState: {
//         events: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchEvents.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.events = action.payload;
//             })
//             .addCase(fetchEvents.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(addNewEvent.fulfilled, (state, action) => {
//                 state.events.push(action.payload);
//             })
//             .addCase(updateExistingEvent.fulfilled, (state, action) => {
//                 const index = state.events.findIndex(event => event.id === action.payload.id);
//                 if (index !== -1) {
//                     state.events[index] = action.payload;
//                 }
//             })
//             .addCase(deleteExistingEvent.fulfilled, (state, action) => {
//                 state.events = state.events.filter(event => event.id !== action.payload);
//             });
//     },
// });

// export default eventSlice.reducer;
