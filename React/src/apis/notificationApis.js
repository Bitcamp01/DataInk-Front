import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 최신 알림 3건 가져오기
export const fetchLatest = createAsyncThunk(
    'notifications/fetchLatest',
    async (_, thunkApi) => {
      try{
        const response = await axios.get(`${API_BASE_URL}/notification-cache/latest`, {
          headers:{
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
          }
        });
  
        return response.data;
      } catch(e) {
        console.log("Error fetching latest notifications:", e.response ? e.response.data : e.message);
        return thunkApi.rejectWithValue(e);
      }
    }
);


// 알림 읽음 처리
export const markNotificationAsRead = async (notificationId) => {
    try {
        await axios.post(`${API_BASE_URL}/notification-cache/${notificationId}/read`);
    } catch (error) {
        console.error(`Error marking notification ${notificationId} as read:`, error);
        throw error;
    }
};