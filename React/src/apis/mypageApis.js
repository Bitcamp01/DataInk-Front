import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 패스워드 체크 Thunk
export const passwordChk = createAsyncThunk(
    'mypage/passwordChk',
    async (password, thunkApi) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/mypage/password-check`,
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

// 마이페이지 정보 업데이트 Thunk
export const updateMypageInfo = createAsyncThunk(
    'mypage/updateMypageInfo',
    async (userInfo, thunkApi) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/mypage/update-profile`,
                userInfo,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                        'Content-Type': 'application/json'
                }
            });
            return response.data; // 성공 시 데이터 반환 (배경 이미지, 프로필 이미지, 소개글 등)
        } catch (error) {
            // 에러 발생 시 rejectWithValue로 에러 메시지 반환
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 모든 프로젝트 데이터를 가져오는 Thunk 추가
export const getAllProjects = createAsyncThunk(
    'mypage/getAllProjects',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/projects/all`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                },
            });
            return response.data; // 성공 시 데이터 반환
        } catch (error) {
            // 에러 발생 시 rejectWithValue로 에러 메시지 반환
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const fetchMypageInfo = createAsyncThunk(
    'mypage/fetchMypageInfo',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/mypage`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                }
            });
            return response.data; // 성공 시 데이터 반환 (배경 이미지, 프로필 이미지, 소개글 등)
        } catch (error) {
            // 에러 발생 시 rejectWithValue로 에러 메시지 반환
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 프로필 이미지 삭제 Thunk
export const deleteProfileImage = createAsyncThunk(
    'mypage/deleteProfileImage',
    async (_, thunkApi) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/mypage/profile-image`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            return response.data; // 성공 시 데이터 반환
        } catch (error) {
            // 에러 발생 시 rejectWithValue로 에러 메시지 반환
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 배경 이미지 삭제 Thunk
export const deleteBackgroundImage = createAsyncThunk(
    'mypage/deleteBackgroundImage',
    async (_, thunkApi) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/mypage/background-image`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            return response.data; // 성공 시 데이터 반환
        } catch (error) {
            // 에러 발생 시 rejectWithValue로 에러 메시지 반환
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
