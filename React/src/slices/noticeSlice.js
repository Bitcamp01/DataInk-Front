import { createSlice } from "@reduxjs/toolkit";
import { getNotice, post } from "../apis/noticeApis";

const noticeSlice = createSlice({
    name: 'notice',
    initialState: {
        notice: [],
        searchCondition: 'all',
        searchKeyword: '',
    },
    reducers: {
        change_searchCondition: (state, action) => ({
            ...state,
            searchCondition: action.payload
        }),
        change_searchKeyword: (state, action) => ({
            ...state,
            searchKeyword: action.payload
        })
    },
    extraReducers: (builder) => {
        builder.addCase(post.fulfilled, (state, action) => {
            alert('정상적으로 등록되었습니다.');

            return {
                ...state,
                notice: action.payload.pageItems,
                searchCondition: 'all',
                searchKeyword: '',
                page: 0
            }
        });
        builder.addCase(post.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            console.log(action.payload);
            return state;
        });
        builder.addCase(getNotice.fulfilled, (state, action) => ({
            ...state,
            notice: action.payload.pageItems,
            searchCondition: action.payload.item.searchCondition,
            searchKeyword: action.payload.item.searchKeyword,
            page: action.payload.pageItems.pageable.pageNumber
        }));
        builder.addCase(getNotice.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            return state;
        });
    }
});

export const {change_searchCondition, change_searchKeyword} = noticeSlice.actions;

export default noticeSlice.reducer;