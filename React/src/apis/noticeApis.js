import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const post = createAsyncThunk(
    'notice/post',
    async (formData, thunkApi) => {
      try{
        const response = await axios.post(`${API_BASE_URL}/notice`, formData,{
          headers:{
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            "Content-Type" : "multipart/form-data"
          }
        });
  
        return response.data;
      } catch(e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );
  

export const getNotice = createAsyncThunk(
    'notice/getNotice',
    async(searchObj, thunkApi) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/notice`,  {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                },
                params: {
                    searchCondition: searchObj.searchCondition,
                    searchKeyword: searchObj.searchKeyword,
                    page: searchObj.page
                }
            });

            return response.data;
        } catch(e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);