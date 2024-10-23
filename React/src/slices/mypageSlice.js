import { createSlice } from '@reduxjs/toolkit';
import { passwordChk, getAllProjects, fetchMypageInfo, updateMypageInfo  } from '../apis/mypageApis';

const mypageSlice = createSlice({
    name: 'mypage',
    initialState: {
        profileImg: "",
        backgroundImg: "",
        isProfileAuthenticated: false,
        userDetails: null,
        projects: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetProfileAuth: (state) => {
            state.isProfileAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(passwordChk.fulfilled, (state, action) => {
            state.isProfileAuthenticated = true;
            state.userDetails = action.payload;
        })
        .addCase(passwordChk.rejected, (state, action) => {
            if (action.payload.status === 401) {
                alert("잘못된 비밀번호입니다.");
            } else {
                alert('확인 중 에러가 발생했습니다.');
            }
        })
        .addCase(getAllProjects.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.projects = action.payload; // 프로젝트 데이터를 상태에 저장
        })
        .addCase(getAllProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            alert('프로젝트 데이터를 불러오는 중 에러가 발생했습니다.');
        })
        .addCase(fetchMypageInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMypageInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.profileImg = action.payload.profileImg;
            state.backgroundImg = action.payload.backgroundImg;
            state.userDetails = action.payload.userDetails;
        })
        .addCase(fetchMypageInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            alert('마이페이지 정보를 불러오는 중 에러가 발생했습니다.');
        })
        .addCase(updateMypageInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateMypageInfo.fulfilled, (state, action) => {
            state.loading = false;
            // 업데이트된 사용자 정보로 상태 업데이트
            state.userDetails = {
                ...state.userDetails,
                dep: action.payload.dep,
                nickname: action.payload.nickname,
                addr: action.payload.addr
            };
            alert('프로필 정보가 성공적으로 업데이트되었습니다.');
        })
        .addCase(updateMypageInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            alert('프로필 정보 업데이트 중 에러가 발생했습니다.');
        })
    }
});

export const { resetProfileAuth } = mypageSlice.actions;

export default mypageSlice.reducer;
