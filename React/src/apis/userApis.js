// src/apis/userApis.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const join = createAsyncThunk(
    'users/join',
    async (user, thunkApi) => {
        try {
            const response = await axios.post('https://dataink.site/users/join', user);
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
            const response = await axios.post('https://dataink.site/users/login', user);
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
            const response = await axios.get('https://dataink.site/users/logout', {
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
            const response = await axios.post('https://dataink.site/users/tel-check', { tel });
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
            const response = await axios.post('https://dataink.site/users/id-check', { id });
            return response.data.item;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);
