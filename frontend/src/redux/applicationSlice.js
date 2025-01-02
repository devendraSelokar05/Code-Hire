import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState:{
        applicants:null,
    },
    reducers:{
        setApplicants:(state,payload)=>{
            state.applicants = payload.payload;
        }
    }
})

export const {setApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;