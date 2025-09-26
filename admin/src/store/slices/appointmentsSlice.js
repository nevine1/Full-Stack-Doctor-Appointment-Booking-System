import { createSlice } from "@reduxjs/toolkit";

const appointmentsSlice = createSlice({
    name: 'appointments', 
    initialState: {
        appointments: [], 
        isLoading: null,

    }, 
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setAllAppointments: (state, action) => {
            state.appointments = action.payload; 
        },
        setDoctorAppointments: (state, action) => {
            state.appointments = action.payload; //this is the appointments for each doctor
        }
    }
})

export const { setAllAppointments, setIsLoading, setDoctorAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer