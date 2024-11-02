import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // createAsyncThunk를 사용하여 API 호출 정의
export const fetchTabData = createAsyncThunk(
  'memberManagement/fetchTabData',
  async ({ tab, page }, thunkApi) => {
    try {
      console.log("memberManagement/fetchTabData 호출")
      const response = await axios.get(`${API_BASE_URL}/member`, {
        params: {
          tab,
          page: page - 1,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
        }
      });
      return { tab, data: response.data };
    } catch (error) {
      console.log("error :", error)
      
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchModalData = createAsyncThunk(
  'modalManagement/fetchModalData',
  async ({ page, size = 100}, thunkApi) =>{
    try{
      const response = await axios.get(`${API_BASE_URL}/member/modal`,{
        params:{
          page,
          size
        },
        headers: {
          Authorization : `Bearer ${sessionStorage.getItem(`ACCESS_TOKEN`)}`
        }
      });
      console.log(response);
      return  response.data.pageItems;
    }catch(error){
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// 특정 프로젝트의 멤버를 가져오는 Thunk
export const fetchProjectMembers = createAsyncThunk(
  'memberProject/fetchProjectMembers',
  async (projectId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/member/modal-project/${projectId}`, {
        headers: {
          Authorization : `Bearer ${sessionStorage.getItem(`ACCESS_TOKEN`)}`
        }
      });
      return response.data; // 프로젝트 멤버 데이터 반환
    } catch (error) {
      return thunkAPI.rejectWithValue('프로젝트 멤버를 불러오는 중 오류 발생');
    }
  }
);


export const getUserNames = createAsyncThunk(
  'memberProject/getUserNames',
  async (projectId, thunkAPI) =>{
    try{
      const response = await axios.get(`${API_BASE_URL}/member/joined-projects/${projectId}`, {
        headers: {
          Authorization : `Bearer ${sessionStorage.getItem(`ACCESS_TOKEN`)}`
        }
      });
      return response.data.items; // 프로젝트 멤버 데이터 반환
    } catch (error) {
      return thunkAPI.rejectWithValue('프로젝트 멤버를 불러오는 중 오류 발생');
    }
  }
);
