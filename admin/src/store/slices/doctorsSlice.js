import { createSlice } from "@reduxjs/toolkit";

const doctorsSlice = createSlice({
    name: 'doctors', 
    initialState: {
        doctors: [], 
        isLoading: null,

    }, 
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setAllDoctors: (state, action) => {
            state.doctors = action.payload; 
        }
    }
})

export const { setAllDoctors, setIsLoading } = doctorsSlice.actions;
export default doctorsSlice.reducer