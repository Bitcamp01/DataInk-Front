import { createSlice } from "@reduxjs/toolkit";
import { getMember } from "../apis/memberProjectApis";

const memberSlice = createSlice({
    name: 'memberProject',
    initialState: {
        member: { content: [], pageable: { pageNumber: 0, totalPages: 1 } },
        page:0
    },
  
    extraReducers: (builder) => {
        builder.addCase(getProject.fulfilled, (state, action) => {
            state.project = action.payload.pageItems ?? [];
            state.page = action.payload.pageItems?.pageable?.pageNumber ?? 0;
        })
        .addCase(getMember.rejected, (state, action) => {
            console.error('데이터를 가져오는 중 에러가 발생했습니다.', action.payload);
              });

    
            }
        });
        

export default memberProjectSlice.reducer;