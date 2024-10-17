import { createSlice } from '@reduxjs/toolkit';
import { passwordChk } from '../apis/mypageApis';

const mypageSlice = createSlice({
    name: 'mypage',
    initialState: {
        profileImg: "",
        backgroundImg: "",
        isProfileAuthenticated: false,
        userDetails: null
    },
    reducers: {
        resetProfileAuth: (state) => {
            state.isProfileAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(passwordChk.fulfilled, (state, action) => {
            state.isProfileAuthenticated = true;
            state.userDetails = action.payload; // 서버에서 가져온 사용자 정보를 저장
        });
        builder.addCase(passwordChk.rejected, (state, action) => {
            if (action.payload.status === 401) {
                alert("잘못된 비밀번호입니다.");
            } else {
                alert('확인 중 에러가 발생했습니다.');
            }
        });
    }
});

export const { resetProfileAuth } = mypageSlice.actions;

export default mypageSlice.reducer;
