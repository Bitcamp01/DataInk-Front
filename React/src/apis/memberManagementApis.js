import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getMember = createAsyncThunk(
    
    'memberManagement/getMember',
    async (searchObj, thunkApi) => {
      try{
        const response = await axios.get('http://localhost:9090/member', { 
          headers:{
            Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
           
          },
          params: {
            page: searchObj.page,
            size:15,
        }
        });
  
        return response.data;
      } catch(e) {
        return thunkApi.rejectWithValue(e);
      }
    }
  );