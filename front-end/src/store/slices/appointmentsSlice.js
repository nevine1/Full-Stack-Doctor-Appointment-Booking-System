import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    appointments: [], 
    isLoading: false, 
    error: null, 
}

const appointmentsSlice = createSlice({
    name: "appointments", 
    initialState,
    reducers: {
        setAppointments : (state, action) => {
            state.appointments = action.payload;
        }, 
        clearAppointments: (state, action) => {
            state.appointments = []
        }
    }
    
})



export const { setAppointments, clearAppointments } = appointmentsSlice.actions

export default appointmentsSlice.reducer