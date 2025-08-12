import { createSlice } from "@reduxjs/toolkit";
//import { doctorsList } from "@/assets/assets";

const initialState = { 
    doctors: [], 
    token: null,
    isLoading: false, 
    error: null
}
const doctorsSlice = createSlice({
    name: "doctors",
    initialState, 
    reducers: {
        setDoctors: (state, action) => {
            state.doctors = action.payload
        }, 
        setToken: (state, action) => {
            state.token = action.payload
        }
    }

})

export const { setDoctors , setToken } = doctorsSlice.actions;
export default doctorsSlice.reducer; 