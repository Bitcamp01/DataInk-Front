import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const post = createAsyncThunk(
    'notice/post',
    async (formData, thunkApi) => {
      try{
        const response = await axios.post('http://localhost:3001/notice', formData,{
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
            const response = await axios.get('http://localhost:3001/notice',  {
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