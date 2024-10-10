import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice'; // userSlice를 임포트

export const store = configureStore({
    reducer: {
        user: userSlice, // userSlice를 스토어에 연결
    },
});