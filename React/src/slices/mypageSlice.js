import { createSlice } from '@reduxjs/toolkit';
import { passwordChk } from '../apis/mypageApis';

const mypageSlice = createSlice({
    name: 'mypage',
    initialState: {
        profileImg: "",
        backgroundImg: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(passwordChk.fulfilled, (state, action) => {
            window.location.href = '/mypage';
            return state;
        });
        builder.addCase(passwordChk.rejected, (state, action) => {
            if (action.payload.status === 401) {
                alert("잘못된 비밀번호입니다.");
            } else {
                alert('확인 중 에러가 발생했습니다.');
            }
            return state;
        });
    }
});

export default mypageSlice.reducer;
