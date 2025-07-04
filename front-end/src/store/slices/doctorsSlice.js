import { createSlice } from "@reduxjs/toolkit";
import { doctors } from "@/assets/assets";

const initialState = { 
    doctorsList: doctors, 
    isLoading: false, 
    error: null
}
const doctorsSlice = createSlice({
    name: "doctors",
    initialState, 
    reducers: {

    }

})

export const { } = doctorsSlice.actions;
export default doctorsSlice.reducer; 