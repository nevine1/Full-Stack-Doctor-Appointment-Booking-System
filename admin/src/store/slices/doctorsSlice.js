import { createSlice } from "@reduxjs/toolkit";

const doctorsSlice = createSlice({
    name: 'doctors', 
    initialState: {
        doctors: [], 
        doctorToken: "",
        isLoading: null,

    }, 
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setAllDoctors: (state, action) => {
            state.doctors = action.payload; 
        }, 
        setDoctorToken: (state, action) => {
            state.doctorToken = action.payload;
        }
    }
})

export const { setAllDoctors, setIsLoading, setDoctorToken } = doctorsSlice.actions;
export default doctorsSlice.reducer