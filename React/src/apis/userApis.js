// src/apis/userApis.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const join = createAsyncThunk(
    'users/join',
    async (user, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:9090/users/join', user);
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
            const response = await axios.post('http://localhost:9090/users/login', user);
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
            const response = await axios.get('http://localhost:9090/users/logout', {
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
            const response = await axios.post('http://localhost:9090/users/tel-check', { tel });
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
            const response = await axios.post('http://localhost:9090/users/id-check', { id });
            return response.data.item;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const changePassword = createAsyncThunk(
    'users/changePassword ',
    async ({ currentPassword, newPassword, userId }, thunkApi) => {
        try {
            console.log(userId);
            const response = await axios.post(
                `http://localhost:9090/users/${userId}/change-password`,
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    },
                }
            );
            console.log('Response:', response);
            if (response.status === 200) {
                return response.data;
            }

        } catch (error) {
            console.error('Error in changePassword Thunk:', error);
            return thunkApi.rejectWithValue(
                error.response?.data?.statusMessage || '비밀번호 변경 중 오류가 발생했습니다.');
        }
    }
);