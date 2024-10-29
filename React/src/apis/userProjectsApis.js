import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// UserProjects 테이블에서 참여한 프로젝트들 꺼내오기
export const getUserProjects = createAsyncThunk(
    'userProjects/getUserProjects',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user-projects/projects`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

// 북마크 상태 업데이트하기
export const updateBookmarkStatus = createAsyncThunk(
    'userProjects/updateBookmarkStatus',
    async ({ projectId, isBookmarked }, thunkApi) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/user-projects/bookmark/${projectId}`,
                { isBookmarked }, // 요청 본문에 북마크 상태를 포함
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                    }
                }
            );
            return response.data.item;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

// 진행률 가져오기
export const getProgress = createAsyncThunk(
    'userProjects/getProgress',
    async ( projectId, thunkApi) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/projects/progress/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                    }
                }
            );
            return { projectId, progress: response.data };
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);