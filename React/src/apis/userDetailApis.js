import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 프로필 이미지 업로드 Thunk
export const uploadProfileImage = createAsyncThunk(
    'profile/uploadProfileImage',
    async (file, thunkApi) => {
        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload-profile-image`, formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`, // 토큰 필요 시 추가
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data; // 성공 시 데이터 반환
        } catch (error) {
            // 에러 발생 시 rejectWithValue로 에러 메시지 반환
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 배경 이미지 업로드 Thunk
export const uploadBackgroundImage = createAsyncThunk(
    'profile/uploadBackgroundImage',
    async (file, thunkApi) => {
        const formData = new FormData();
        formData.append('backgroundImage', file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload-background-image`, formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`, // 토큰 필요 시 추가
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data; // 성공 시 데이터 반환
        } catch (error) {
            // 에러 발생 시 rejectWithValue로 에러 메시지 반환
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
