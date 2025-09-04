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
        }
    }
    
})



export const { setAppointments } = appointmentsSlice.actions

export default appointmentsSlice.reducer