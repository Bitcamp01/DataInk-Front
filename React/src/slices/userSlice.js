import { createSlice } from '@reduxjs/toolkit';
import { join, login, logout, telCheck } from '../apis/userApis'; // telCheck import

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isLogin: false,
        userId: 0,
        name: '',
        id: '',
        email: '',
        tel: '',
        birth: '',
        authen: '',
        telCheckMsg: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Join
            .addCase(join.fulfilled, (state, action) => {
                alert(`${action.payload.id}님 DataInk 가입을 축하드립니다.`);
                window.location.href = '/login';
                return {
                    ...state,
                    ...action.payload,
                    isLogin: true,
                };
            })
            .addCase(join.rejected, (state, action) => {
                alert('에러가 발생했습니다.');
                return state;
            })
            // Login
            .addCase(login.fulfilled, (state, action) => {
                alert(`${action.payload.id}님 환영합니다.`);
                sessionStorage.setItem('ACCESS_TOKEN', action.payload.token);
                return {
                    ...state,
                    ...action.payload,
                    isLogin: true,
                };
            })
            .addCase(login.rejected, (state, action) => {
                if (action.payload.response.data.statusMessage === 'id not exist') {
                    alert("존재하지 않는 아이디입니다.");
                } else if (action.payload.response.data.statusMessage === 'wrong password') {
                    alert("잘못된 비밀번호입니다.");
                } else {
                    alert("로그인 중 에러가 발생했습니다.");
                }
                return state;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                alert("로그아웃 완료.");
                sessionStorage.removeItem("ACCESS_TOKEN");
                return {
                    ...state,
                    isLogin: false,
                    userId: 0,
                    name: '',
                    id: '',
                    email: '',
                    tel: '',
                    authen: '',
                    birth: '',
                };
            })
            .addCase(logout.rejected, (state, action) => {
                alert("에러가 발생했습니다.");
                return state;
            })
            // Tel Check
            .addCase(telCheck.fulfilled, (state, action) => {
                state.telCheckMsg = action.payload.telCheckMsg;
            })
            .addCase(telCheck.rejected, (state, action) => {
                state.telCheckMsg = 'error';
            });
    }
});

export default userSlice.reducer;
