import { createSlice } from '@reduxjs/toolkit';
import { passwordChk, getProjectsBySearch, updateMypageInfo,
    updateProfileImage, deleteProfileImage,
    updateBackgroundImage, deleteBackgroundImage, fetchProfileIntro, updateProfileIntro, fetchUserDetails } from '../apis/mypageApis';

const mypageSlice = createSlice({
    name: 'mypage',
    initialState: {
        profileImage: '/images/dataInk_profile_default.png',
        backgroundImage: '/images/dataInk_background_default.jpg',
        isProfileAuthenticated: false,
        userDetails: {
            dep: '',
            nickname: '',
            addr: '',
        },
        projects: [],
        searchCondition: 'all',
        searchKeyword: '',
        profileIntro: '소개 글을 입력해 주세요.',
        page: 1,
    },
    reducers: {
        resetProfileAuth: (state, action) => {
            state.isProfileAuthenticated = action.payload;  // 인증 상태 업데이트
        },
        setBackgroundImage: (state, action) => {
            state.backgroundImage = action.payload || '/images/dataInk_profile_default.png';
        },
        setProfileImage: (state, action) => {
            state.profileImage = action.payload || '/images/dataInk_background_default.jpg';
        },
        change_searchCondition: (state, action) => ({
            ...state,
            searchCondition: action.payload
        }),
        change_searchKeyword: (state, action) => ({
            ...state,
            searchKeyword: action.payload
        }),
        reset_page: (state, action) => ({
            ...state,
            page: 1
        }),
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
        .addCase(fetchUserDetails.fulfilled, (state, action) => {
            state.userDetails = action.payload;  // 가져온 유저 정보를 상태에 저장
        })
        .addCase(updateMypageInfo.fulfilled, (state, action) => {
            // 업데이트된 사용자 정보로 상태 업데이트
            state.userDetails = {
                ...state.userDetails,
                dep: action.payload.dep,
                nickname: action.payload.nickname,
                addr: action.payload.addr
            };
        })
        .addCase(updateMypageInfo.rejected, (state, action) => {
            state.error = action.error.message;
            alert('프로필 정보 업데이트 중 에러가 발생했습니다.');
        })
        // 프로필 이미지 업로드 또는 업데이트 처리
        .addCase(updateProfileImage.fulfilled, (state, action) => {
            state.profileImage = action.payload.profileImageUrl;
        })
        .addCase(updateProfileImage.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(updateBackgroundImage.fulfilled, (state, action) => {
            state.backgroundImage = action.payload.backgroundImageUrl;
        })
        .addCase(updateBackgroundImage.rejected, (state, action) => {
            state.error = action.payload;
        })
        // 프로필 이미지 삭제
        .addCase(deleteProfileImage.fulfilled, (state) => {
            state.profileImage = ''; // 기본 이미지로 설정
        })
        .addCase(deleteProfileImage.rejected, (state, action) => {
            state.error = action.payload;
        })
        // 배경 이미지 삭제
        .addCase(deleteBackgroundImage.fulfilled, (state) => {
            state.backgroundImage = ''; // 기본 이미지로 설정
        })
        .addCase(deleteBackgroundImage.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(fetchProfileIntro.fulfilled, (state, action) => {
            state.profileIntro = action.payload.profileIntro; 
        })
        .addCase(fetchProfileIntro.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(updateProfileIntro.fulfilled, (state, action) => {
            state.profileIntro = action.payload.profileIntro;
        })
        .addCase(updateProfileIntro.rejected, (state, action) => {
            state.error = action.payload;
        })
        builder.addCase(getProjectsBySearch.fulfilled, (state, action) => ({
            ...state,
            projects: action.payload.pageItems,
            searchCondition: action.payload.item.searchCondition,
            searchKeyword: action.payload.item.searchKeyword,
            page: action.payload.pageItems.pageable.pageNumber
        }))
        builder.addCase(getProjectsBySearch.rejected, (state, action) => {
            console.log(action.payload);
            alert('getProjectsBySearch 에러가 발생했습니다.');
            return state;
        });        
    }
});

export const { change_searchCondition, change_searchKeyword, resetProfileAuth, setBackgroundImage, setProfileImage, reset_page } = mypageSlice.actions;

export default mypageSlice.reducer;
