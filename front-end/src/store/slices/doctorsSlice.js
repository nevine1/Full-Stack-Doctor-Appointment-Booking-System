import { createSlice } from "@reduxjs/toolkit";
import { doctorsList } from "@/assets/assets";

const initialState = { 
    doctors: doctorsList, 
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