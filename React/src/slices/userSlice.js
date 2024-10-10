import { createSlice } from '@reduxjs/toolkit';
import { join, login, logout } from '../apis/userApis'; 

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isLogin: false,
        userId: 0,
        id: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(join.fulfilled, (state, action) => {
            alert(`${action.payload.id}님 DataInk 가입을 축하드립니다.`);
            window.location.href = '/login';
            return state;
        });
        builder.addCase(join.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            return state;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            alert(`${action.payload.id}님 환영합니다.`);
            sessionStorage.setItem('ACCESS_TOKEN', action.payload.token);

            return {
                ...state,
                isLogin: true,
                userId: action.payload.userId,
                id: action.payload.id,
            };
        });
        builder.addCase(login.rejected, (state, action) => {
            if (action.payload.response.data.statusMessage === 'id not exist') {
                alert("존재하지 않는 아이디입니다.");
            } else if (action.payload.response.data.statusMessage === 'wrong password') {
                alert("잘못된 비밀번호입니다.");
            } else {
                alert("로그인 중 에러가 발생했습니다.");
            }
            return state;
        });
        builder.addCase(logout.fulfilled, (state) => {
            alert("로그아웃 완료.");
            sessionStorage.removeItem("ACCESS_TOKEN");

            return {
                ...state,
                isLogin: false,
                userId: 0,
                id: '',    
            };
        });
        builder.addCase(logout.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
    }
});

export default userSlice.reducer;
