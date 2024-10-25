import { createSlice } from '@reduxjs/toolkit';
import { passwordChk, getAllProjects, fetchMypageInfo,updateMypageInfo,
    uploadProfileImage, deleteProfileImage,
    uploadBackgroundImage, deleteBackgroundImage  } from '../apis/mypageApis';

const DEFAULT_PROFILE_IMAGE = '/images/dataInk_profile_default.png';
const DEFAULT_BACKGROUND_IMAGE = '/images/dataInk_background_default.jpg';

const mypageSlice = createSlice({
    name: 'mypage',
    initialState: {
        status: "소개 글을 입력해 주세요.",
        profileImage: '/images/dataInk_profile_default.png',
        backgroundImage: '/images/dataInk_background_default.jpg',
        isProfileAuthenticated: false,
        userDetails: null,
        projects: [],
    },
    reducers: {
        resetProfileAuth: (state) => {
            state.isProfileAuthenticated = false;
        },
        setProfileAuthenticated: (state) => {
            state.isProfileAuthenticated = true;
        },
        setBackgroundImage: (state, action) => {
            state.backgroundImage = action.payload || '/images/dataInk_profile_default.png';
        },
        setProfileImage: (state, action) => {
            state.profileImage = action.payload || '/images/dataInk_background_default.jpg';
        },
        setStatus: (state, action) => {
            state.status = action.payload;
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
        .addCase(fetchMypageInfo.fulfilled, (state, action) => {
            const userData = action.payload.user;
            state.status = userData?.status || "소개 글을 입력해 주세요.";
            state.profileImage = userData?.profileImage || '/images/dataInk_profile_default.png';
            state.backgroundImage = userData?.backgroundImage || '/images/dataInk_background_default.jpg';
        })
        .addCase(fetchMypageInfo.rejected, (state, action) => {
            state.error = action.payload || "정보를 가져오는데 실패했습니다.";
        })
        
        .addCase(updateMypageInfo.fulfilled, (state, action) => {
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
            state.error = action.error.message;
            alert('프로필 정보 업데이트 중 에러가 발생했습니다.');
        })
        .addCase(getAllProjects.fulfilled, (state, action) => {
            state.projects = action.payload; // 프로젝트 데이터를 상태에 저장
        })
        .addCase(getAllProjects.rejected, (state, action) => {
            state.error = action.error.message;
            alert('프로젝트 데이터를 불러오는 중 에러가 발생했습니다.');
        })
        // 프로필 이미지 업로드 또는 업데이트 처리
        .addCase(uploadProfileImage.fulfilled, (state, action) => {
            state.profileImage = action.payload; // 새로운 프로필 이미지 URL로 업데이트
            alert('프로필 이미지가 성공적으로 업로드되었습니다.');
        })
        .addCase(uploadProfileImage.rejected, (state, action) => {
            state.error = action.payload || '프로필 이미지 업로드 중 에러가 발생했습니다.';
        })
        // 프로필 이미지 삭제 처리
        .addCase(deleteProfileImage.fulfilled, (state) => {
            state.profileImage = DEFAULT_PROFILE_IMAGE; // 기본 이미지로 설정
            alert('프로필 이미지가 삭제되었습니다.');
        })
        .addCase(deleteProfileImage.rejected, (state, action) => {
            state.error = action.payload || '프로필 이미지 삭제 중 에러가 발생했습니다.';
        })
        // 배경 이미지 업로드 또는 업데이트 처리
        .addCase(uploadBackgroundImage.fulfilled, (state, action) => {
            state.backgroundImage = action.payload; // 새로운 배경 이미지 URL로 업데이트
            alert('배경 이미지가 성공적으로 업로드되었습니다.');
        })
        .addCase(uploadBackgroundImage.rejected, (state, action) => {
            state.error = action.payload || '배경 이미지 업로드 중 에러가 발생했습니다.';
        })
        // 배경 이미지 삭제 처리
        .addCase(deleteBackgroundImage.fulfilled, (state) => {
            state.backgroundImage = DEFAULT_BACKGROUND_IMAGE; // 기본 이미지로 설정
            alert('배경 이미지가 삭제되었습니다.');
        })
        .addCase(deleteBackgroundImage.rejected, (state, action) => {
            state.error = action.payload || '배경 이미지 삭제 중 에러가 발생했습니다.';
        });
    }
});

export const { resetProfileAuth, setProfileAuthenticated, setBackgroundImage, setProfileImage, setStatus } = mypageSlice.actions;

export default mypageSlice.reducer;
