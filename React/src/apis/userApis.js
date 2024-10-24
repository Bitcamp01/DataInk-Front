// src/apis/userApis.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const join = createAsyncThunk(
    'users/join',
    async (user, thunkApi) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/join`, user);
            return response.data.item;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const login = createAsyncThunk(
    'users/login',
    async (user, thunkApi) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/login`, user);
            return response.data.item;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const logout = createAsyncThunk(
    'users/logout',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            return response.data.item;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const telCheck = createAsyncThunk(
    'users/tel-Check',
    async (tel, thunkApi) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/tel-check`, { tel });
            return response.data.item;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const idCheck = createAsyncThunk(
    'users/id-check',
    async (id, thunkApi) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/id-check`, { id });
            return response.data.item;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);
