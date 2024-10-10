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
