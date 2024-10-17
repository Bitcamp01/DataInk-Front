import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// 프로필 이미지 업로드 Thunk
export const uploadProfileImage = createAsyncThunk(
    'mypage/uploadProfileImage',
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
    'mypage/uploadBackgroundImage',
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

// 패스워드 체크 Thunk
export const passwordChk = createAsyncThunk(
    'mypage/passwordChk',
    async (password, thunkApi) => {
        try {
            const response = await axios.post(
                'http://localhost:9090/mypage/password-check',
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    },
                    validateStatus: function (status) {
                        return status >= 200 && status < 300 || status === 401;
                    },
                }
            );

            if (response.status === 401) {
                return thunkApi.rejectWithValue({
                    message: 'Incorrect password',
                    status: 401,
                });
            }

            // 사용자 정보 반환
            return response.data.user;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);
