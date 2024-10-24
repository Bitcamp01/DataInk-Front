import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 환경 변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 캘린더 추가 Thunk
export const addCalendar = createAsyncThunk(
    'calendar/addCalendar',
    async ({ calendarName, color }, thunkApi) => {
        try {
            const newCalendar = { calendarName, color };
            const response = await axios.post(`${API_BASE_URL}/calendars`, newCalendar, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                },
            });
            return response.data; // 추가된 캘린더 반환
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 캘린더 수정 Thunk
export const updateCalendar = createAsyncThunk(
    'calendar/updateCalendar',
    async ({ id, calendarName, color }, thunkApi) => {
        try {
            const updatedCalendar = { calendarName, color };
            const response = await axios.put(`${API_BASE_URL}/calendars/${id}`, updatedCalendar, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                },
            });
            return response.data; // 수정된 캘린더 반환
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 캘린더 삭제 Thunk
export const deleteCalendar = createAsyncThunk(
    'calendar/deleteCalendar',
    async (id, thunkApi) => {
        try {
            const response = await axios.delete(`http://
            
            
            
            
            
            /calendars/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                },
            });
            return id; // 삭제된 캘린더의 ID 반환
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 일정 추가 Thunk
export const addEvent = createAsyncThunk(
    'event/addEvent',
    async ({ calendarId, title, startDate, endDate, memo }, thunkApi) => {
        try {
            if (new Date(startDate) > new Date(endDate)) {
                throw new Error('종료일은 시작일보다 늦어야 합니다.');
            }

            const adjustedEndDate = new Date(endDate);
            adjustedEndDate.setDate(adjustedEndDate.getDate());

            const newEvent = { calendarId, title, startDate, endDate: adjustedEndDate.toISOString().split("T")[0], memo };
            const response = await axios.post(`${API_BASE_URL}/events`, newEvent, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                },
            });

            console.log(response.data);
            return response.data; // 추가된 일정 반환
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 일정 수정 Thunk
export const updateEvent = createAsyncThunk(
    'event/updateEvent',
    async ({ id, title, startDate, endDate, memo }, thunkApi) => {
        try {
            if (new Date(startDate) > new Date(endDate)) {
                throw new Error('종료일은 시작일보다 늦어야 합니다.');
            }

            const adjustedEndDate = new Date(endDate);
            adjustedEndDate.setDate(adjustedEndDate.getDate());

            const updatedEvent = { title, startDate, endDate: adjustedEndDate.toISOString().split("T")[0], memo };
            const response = await axios.put(`${API_BASE_URL}/events/${id}`, updatedEvent, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data; // 수정된 일정 반환
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 일정 삭제 Thunk
export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (id, thunkApi) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/events/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                },
            });
            return id; // 삭제된 일정의 ID 반환
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 캘린더 가지고오기
export const fetchCalendars = createAsyncThunk(
    'calendar/fetchCalendars',
    async (thunkApi) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/calendars`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
            });

            console.log(response);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
});

// 이벤트 가지고오기
export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async (thunkApi) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/events`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
            });
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
});

// 패스워드 체크 Thunk
export const passwordChk = createAsyncThunk(
    'mypage/passwordChk',
    async (password, thunkApi) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/mypage/password-check`,
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    },
                    validateStatus: function (status) {
                        return status >= 200 && status < 300 || status === 401;
                    },
                }
            );

            if (response.status === 401) {
                return thunkApi.rejectWithValue({
                    message: 'Incorrect password',
                    status: 401,
                });
            }

            // 사용자 정보 반환
            return response.data.user;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

// 마이페이지 정보 가져오는 Thunk
export const fetchMypageInfo = createAsyncThunk(
    'mypage/fetchMypageInfo',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/mypage`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                }
            });
            return response.data; // 성공 시 데이터 반환
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 마이페이지 정보 업데이트 Thunk
export const updateMypageInfo = createAsyncThunk(
    'mypage/updateMypageInfo',
    async (userInfo, thunkApi) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/mypage/update-profile`,
                userInfo,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                        'Content-Type': 'application/json'
                }
            });
            return response.data; // 성공 시 데이터 반환 (배경 이미지, 프로필 이미지, 소개글 등)
        } catch (error) {
            // 에러 발생 시 rejectWithValue로 에러 메시지 반환
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 모든 프로젝트 데이터를 가져오는 Thunk 추가
export const getAllProjects = createAsyncThunk(
    'mypage/getAllProjects',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/projects/all`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                },
            });
            return response.data; // 성공 시 데이터 반환
        } catch (error) {
            // 에러 발생 시 rejectWithValue로 에러 메시지 반환
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 프로필 이미지 업로드 Thunk
export const uploadProfileImage = createAsyncThunk(
    'mypage/uploadProfileImage',
    async (file, thunkApi) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
                `${API_BASE_URL}/mypage/upload-profile-image`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 프로필 이미지 업데이트 Thunk
export const updateProfileImage = createAsyncThunk(
    'mypage/updateProfileImage',
    async (file, thunkApi) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.put(
                `${API_BASE_URL}/mypage/update-profile-image`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 프로필 이미지 삭제 Thunk
export const deleteProfileImage = createAsyncThunk(
    'mypage/deleteProfileImage',
    async (_, thunkApi) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/mypage/delete-profile-image`,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 배경 이미지 업로드 Thunk
export const uploadBackgroundImage = createAsyncThunk(
    'mypage/uploadBackgroundImage',
    async (file, thunkApi) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
                `${API_BASE_URL}/mypage/upload-background-image`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 배경 이미지 업데이트 Thunk
export const updateBackgroundImage = createAsyncThunk(
    'mypage/updateBackgroundImage',
    async (file, thunkApi) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.put(
                `${API_BASE_URL}/mypage/update-background-image`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// 배경 이미지 삭제 Thunk
export const deleteBackgroundImage = createAsyncThunk(
    'mypage/deleteBackgroundImage',
    async (_, thunkApi) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/mypage/delete-background-image`,
                {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);




