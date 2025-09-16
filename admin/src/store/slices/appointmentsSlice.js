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
        }
    }
})

export const { setAllAppointments, setIsLoading } = appointmentsSlice.actions;
export default appointmentsSlice.reducer