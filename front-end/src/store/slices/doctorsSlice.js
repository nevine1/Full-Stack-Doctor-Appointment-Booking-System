import { createSlice } from "@reduxjs/toolkit";
//import { doctorsList } from "@/assets/assets";

const initialState = { 
    doctors: [], 
    isLoading: false, 
    error: null
}
const doctorsSlice = createSlice({
    name: "doctors",
    initialState, 
    reducers: {
        setDoctors: (state, action) => {
            state.doctors = action.payload
        }
    }

})

export const { setDoctors } = doctorsSlice.actions;
export default doctorsSlice.reducer; 